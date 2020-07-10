"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfInput = void 0;
var parser_1 = require("../parser");
var state_1 = require("../state");
/**
 * A parser that matches end of input
 * Fails when there is still input left
 */
exports.endOfInput = parser_1.Parser.from(function (state) {
    if (state.text.length > 0) {
        return state_1.ErrorState(state, "Parser endOfInput: expected end of input but found \"" + state.text.charAt(0) + "\"");
    }
    return state_1.ResultState.update(state, undefined, 0);
});
