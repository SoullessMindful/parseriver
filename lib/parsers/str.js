"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = void 0;
var parser_1 = require("./../parser");
var state_1 = require("../state");
exports.str = function (pattern) {
    return parser_1.Parser.from(function (state) {
        var text = state.text;
        var shift = pattern.length;
        if (text.length < shift) {
            return state_1.ErrorState(state, 'Parser str: unexpected end of input');
        }
        if (text.startsWith(pattern)) {
            return state_1.ResultState.update(state, // updated state
            pattern, // result
            shift // shift
            );
        }
        return state_1.ErrorState(state, "Parser str: was looking for \"" + pattern + "\", found \"" + text.slice(0, shift) + "\"");
    });
};
