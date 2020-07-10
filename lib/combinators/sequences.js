"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surroundedByExtract = exports.surroundedBy = exports.sequenceOf = void 0;
var state_1 = require("./../state");
var parser_1 = require("./../parser");
/**
 * Takes in multiple parsers and returns a parser that matches all of them one after another
 * It succeeds if all parsers succeed, the result is an array of all results
 * @param parsers Parsers to be sequenced
 */
exports.sequenceOf = function () {
    var parsers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parsers[_i] = arguments[_i];
    }
    return parser_1.Parser.from(function (state) {
        var results = [];
        var nextState = state;
        for (var _i = 0, parsers_1 = parsers; _i < parsers_1.length; _i++) {
            var parser = parsers_1[_i];
            nextState = parser.apply(nextState);
            if (nextState.__type__ === 'ResultState') {
                results.push(nextState.result);
            }
            else
                break;
        }
        if (nextState.__type__ === 'ResultState' ||
            nextState.__type__ === 'InitialState') {
            return state_1.ResultState.update(nextState, results, 0);
        }
        return nextState;
    });
};
/**
 * Takes left and right parsers and then a middle parser and returns a new parser which matches the match of the middle parser surrounded by matches of left and right parsers
 * The result is an object with properties: left, middle, right
 * @param leftParser A parser matching content to the left of middleParser
 * @param rightParser A parser matching content to the left of middleParser
 * @param middleParser A parser matching middle of the content
 */
exports.surroundedBy = function (leftParser, rightParser) { return function (middleParser) {
    return exports.sequenceOf(leftParser, middleParser, rightParser).map(function (_a) {
        var left = _a[0], middle = _a[1], right = _a[2];
        return ({ left: left, middle: middle, right: right });
    });
}; };
/**
 * Takes left and right parsers and then a middle parser and returns a new parser which matches the match of the middle parser surrounded by matches of left and right parsers.
 * After that it extracts the result of the middle parser
 * @param leftParser A parser matching content to the left of middleParser
 * @param rightParser A parser matching content to the left of middleParser
 * @param middleParser A parser matching middle of the content and thus the result
 */
exports.surroundedByExtract = function (leftParser, rightParser) { return function (middleParser) {
    return exports.surroundedBy(leftParser, rightParser)(middleParser).map(function (surroundTriple) { return surroundTriple.middle; });
}; };
