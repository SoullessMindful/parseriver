"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exactly = exports.many = exports.atMost = exports.atLeast = exports.between = exports.optional = void 0;
var state_1 = require("./../state");
var parser_1 = require("./../parser");
/**
 * Takes a parser and makes it into a new one working the same way as the original one, except it can never fail
 * @param parser A parser to be optionalized
 */
exports.optional = function (parser) {
    return parser_1.Parser.from(function (state) {
        var nextState = parser.apply(state);
        if (nextState.__type__ === 'ErrorState') {
            return state.__type__ === 'InitialState'
                ? state_1.ResultState.update(state, undefined, 0)
                : state;
        }
        return nextState;
    });
};
/**
 * Takes two numbers and parser and returns a parser, that tries too match the given parser the amount of times between the two given numbers
 * It fails only when when there is too little matches
 * In case there is too many matches it just stops parsing
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param parser A parser to be repeatedly matched
 */
exports.between = function (lowerBound, upperBound) { return function (parser) {
    return parser_1.Parser.from(function (state) {
        // In this combinator using mutable state is actually a good idea
        var results = [];
        var currState;
        var nextState = state;
        var i = 0;
        while (true) {
            currState = nextState;
            nextState = parser.apply(currState);
            if (nextState.__type__ === 'ErrorState' || i >= upperBound) {
                break;
            }
            else {
                results.push(nextState.result);
                i++;
            }
        }
        if (lowerBound <= i) {
            return state_1.ResultState.update(currState, results, 0);
        }
        return state_1.ErrorState(state, "Combinator between: Should have found from " + lowerBound + " to " + upperBound + " matches, but found " + i);
    });
}; };
/**
 * Takes a number and parser and returns a parser, that tries to match the given parser at least the given number times
 * It fails only when when there is too little matches
 * @param lowerBound A minimal number of matches
 * @param parser A parser to be repeatedly matched
 */
exports.atLeast = function (lowerBound) { return exports.between(lowerBound, Infinity); };
/**
 * Takes a number and parser and returns a parser, that tries to match the given parser repeatedly at most the given number times
 * It never fails, in case there is too many matches it just stops parsing
 * @param upperBound A maximal number of matches
 * @param parser A parser to be repeatedly matched
 */
exports.atMost = function (upperBound) { return exports.between(0, upperBound); };
/**
 * Takes a parser and returns a parser, that tries to match the given parser until it fails
 * It never fails, if there are no matches the result is an empty array
 * @param parser A parser to be repeatedly matched
 */
exports.many = exports.atLeast(0);
/**
 * Takes a number and a parser and returns a parser, that tries to match the given parser exactly the given number times
 * It fails only when when there is too little matches
 * In case there is too many matches it just stops parsing
 * @param parser A parser to be repeatedly matched
 */
exports.exactly = function (times) { return exports.between(times, times); };
