"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$do = void 0;
var parser_1 = require("../parser");
/**
 * Allows to pipe parser with a syntax similar to async/await
 * @param generator The generator function in which body one can combine parsers
 * @returns The Parser that performs all operations combined
 */
exports.$do = function (generator) {
    return parser_1.success(undefined).bind(function (_) {
        var iterator = generator();
        var loop = function (result) {
            var iteratorResult = iterator.next(result);
            if (iteratorResult.done === true) {
                return parser_1.success(iteratorResult.value);
            }
            return iteratorResult.value.bind(loop);
        };
        return loop();
    });
};
