"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peekState = exports.peekSafe = exports.peek = void 0;
var state_1 = require("./../state");
var parser_1 = require("../parser");
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It succeeds exatly when the given parser succeeds and the results are the same
 * @param parser The parser to be matched without consuming input
 */
exports.peek = function (parser) {
    return parser_1.Parser.from(function (state) {
        var nextState = parser.apply(state);
        if (nextState.__type__ === 'ErrorState') {
            return nextState;
        }
        return state_1.ResultState.update(state, nextState.result, 0);
    });
};
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It never fails
 * If the given parser succeeds the result is the same as its result
 * Otherwise the result is undefined
 * @param parser The parser to be matched without consuming input
 */
exports.peekSafe = function (parser) {
    return parser_1.Parser.from(function (state) {
        var nextState = parser.apply(state);
        if (nextState.__type__ === 'ErrorState') {
            return state_1.ResultState.update(state, undefined, 0);
        }
        return state_1.ResultState.update(state, nextState.result, 0);
    });
};
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It never fails, the result is the state after matching the given parser
 * @param parser The parser to be matched without consuming input
 */
exports.peekState = function (parser) {
    return parser_1.Parser.from(function (state) { return state_1.ResultState.update(state, parser.apply(state), 0); });
};
