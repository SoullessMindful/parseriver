"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.separatedByExactly = exports.separatedByAtMost = exports.separatedByAtLeast = exports.separatedBy = exports.separatedByBetween = void 0;
var parser_1 = require("../parser");
var state_1 = require("../state");
/**
 * Matches the second of the given parsers between lowerBound and upperBound times, separated by the first of the given parsers
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
exports.separatedByBetween = function (lowerBound, upperBound) { return function (separator, trailing) {
    if (trailing === void 0) { trailing = 'never'; }
    return function (parser) {
        return parser_1.Parser.from(function (state) {
            var results = [];
            var currState;
            var nextValState = state;
            var nextSepState = state;
            while (true) {
                currState = nextValState;
                nextValState = parser.apply(nextSepState);
                if (nextValState.__type__ === 'ErrorState' ||
                    results.length >= upperBound) {
                    if (trailing !== 'never') {
                        currState = nextSepState;
                    }
                    break;
                }
                currState = nextSepState;
                nextSepState = separator.apply(nextValState);
                if (nextSepState.__type__ === 'ErrorState') {
                    if (trailing !== 'always') {
                        currState = nextValState;
                        results.push(nextValState.result);
                    }
                    break;
                }
                results.push(nextValState.result);
            }
            if (results.length >= lowerBound) {
                return state_1.ResultState.update(currState, results, 0);
            }
            return state_1.ErrorState(state, "Combinator separatedByBetween: Should have found from " + lowerBound + " to " + upperBound + " matches, but found " + results.length);
        });
    };
}; };
/**
 * Matches the second of the given parsers multiple times, separated by the first of the given parsers
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
exports.separatedBy = exports.separatedByBetween(0, Infinity);
/**
 * Matches the second of the given parsers at least lowerBound times, separated by the first of the given parsers
 * @param lowerBound A minimal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
exports.separatedByAtLeast = function (lowerBound) {
    return exports.separatedByBetween(lowerBound, Infinity);
};
/**
 * Matches the second of the given parsers at most upperBound times, separated by the first of the given parsers
 * @param upperBound A maximal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
exports.separatedByAtMost = function (upperBound) { return exports.separatedByBetween(0, upperBound); };
/**
 * Matches the second of the given parsers exactly the given number times, separated by the first of the given parsers
 * @param times An exact number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
exports.separatedByExactly = function (times) { return exports.separatedByBetween(times, times); };
