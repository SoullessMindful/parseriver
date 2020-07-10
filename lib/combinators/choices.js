"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyOneOf = exports.oneOf = void 0;
var parser_1 = require("./../parser");
var state_1 = require("../state");
/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state one after another until one of them succeeds
 * The result is the result on the first parser that succeeds
 * Fails when none of the parsers succeeds
 * @param parsers Parsers to be tried one after another
 */
exports.oneOf = function () {
    var parsers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parsers[_i] = arguments[_i];
    }
    return parser_1.Parser.from(function (state) {
        var msgs = [];
        for (var _i = 0, parsers_1 = parsers; _i < parsers_1.length; _i++) {
            var parser = parsers_1[_i];
            var nextState = parser.apply(state);
            if (nextState.__type__ === 'ResultState') {
                return nextState;
            }
            else {
                msgs.push(nextState.msg);
            }
        }
        var msg = msgs.join(',\n  ');
        return state_1.ErrorState(state, "Combinator oneOf: none of the below parsers succeeded:\n  " + msg);
    });
};
/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state in parallel
 * Succeed if exactly one of the parsers succeeds, fails otherwise
 * The result is the result of the only successful parser
 * @param parsers Parsers to be tried one after another
 */
exports.onlyOneOf = function () {
    var parsers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parsers[_i] = arguments[_i];
    }
    return parser_1.Parser.from(function (state) {
        var nextStates = parsers.map(function (parser) { return parser.apply(state); });
        var resultStates = nextStates.filter(function (nextState) { return nextState.__type__ === 'ResultState'; });
        var errorStates = nextStates.filter(function (nextState) { return nextState.__type__ === 'ResultState'; });
        switch (resultStates.length) {
            case 0: {
                var msg = errorStates
                    .map(function (errorState) { return errorState.msg; })
                    .join(',\n  ');
                return state_1.ErrorState(state, "Combinator onlyOneOf: none of the below parsers succeeded\n  " + msg);
            }
            case 1:
                return resultStates[0];
            default:
                return state_1.ErrorState(state, 'Combinator onlyOneOf: there were too many matches');
        }
    });
};
