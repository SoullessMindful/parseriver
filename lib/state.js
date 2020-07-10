"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorState = exports.ResultState = exports.InitialState = void 0;
exports.InitialState = function (text) { return ({
    __type__: 'InitialState',
    index: 0,
    text: text,
}); };
exports.ResultState = function (result, text, index) { return ({
    __type__: 'ResultState',
    result: result,
    index: index,
    text: text,
}); };
exports.ResultState.update = function (prevState, result, shift) { return exports.ResultState(result, prevState.text.slice(shift), prevState.index + shift); };
exports.ErrorState = function (prevState, msg) { return ({
    __type__: 'ErrorState',
    msg: msg,
    index: prevState.index,
}); };
