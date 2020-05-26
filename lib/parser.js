"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var state_1 = require("./state");
var Parser = /** @class */ (function () {
    function Parser(func) {
        this.func = func;
    }
    Parser.prototype.apply = function (state) {
        if (state.__type__ === 'ErrorState')
            return state;
        return this.func(state);
    };
    Parser.prototype.run = function (text) {
        var initialState = state_1.InitialState(text);
        return this.apply(initialState);
    };
    Parser.of = function (func) {
        return new Parser(func);
    };
    return Parser;
}());
exports.Parser = Parser;
