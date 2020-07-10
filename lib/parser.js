"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursive = exports.failure = exports.success = exports.Parser = void 0;
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
    Parser.prototype.map = function (callback) {
        var _this = this;
        return Parser.from(function (state) {
            var nextState = _this.func(state);
            if (nextState.__type__ === 'ErrorState')
                return nextState;
            return state_1.ResultState.update(nextState, callback(nextState.result), 0);
        });
    };
    Parser.prototype.bind = function (transform) {
        var _this = this;
        return Parser.from(function (state) {
            var nextState = _this.func(state);
            if (nextState.__type__ === 'ErrorState')
                return nextState;
            return transform(nextState.result).func(nextState);
        });
    };
    Parser.from = function (func) {
        return new Parser(func);
    };
    Parser.of = function (result) {
        return Parser.from(function (state) { return state_1.ResultState.update(state, result, 0); });
    };
    Parser.zero = function (msg) {
        return Parser.from(function (state) { return state_1.ErrorState(state, msg); });
    };
    Parser.recursive = function (parserProvider) {
        return Parser.from(function (state) {
            var parser = parserProvider();
            return parser.func(state);
        });
    };
    return Parser;
}());
exports.Parser = Parser;
exports.success = Parser.of;
exports.failure = Parser.zero;
exports.recursive = Parser.recursive;
