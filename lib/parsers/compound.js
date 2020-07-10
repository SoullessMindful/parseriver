"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalFloat = exports.decimalUfloat = exports.decimalInt = exports.decimalUint = exports.digitsNonzero = exports.digits = exports.lettersLatinExtUpper = exports.lettersLatinExtLower = exports.lettersLatinExt = exports.lettersLatinUpper = exports.lettersLatinLower = exports.lettersLatin = exports.lettersUpper = exports.lettersLower = exports.letters = exports.optionalWhitespaceMultiline = exports.optionalWhitespace = exports.whitespaceMultiline = exports.whitespace = exports.newline = exports.tab = exports.space = void 0;
var str_1 = require("./str");
var multiples_1 = require("../combinators/multiples");
var choices_1 = require("../combinators/choices");
var regexp_1 = require("./regexp");
var sequences_1 = require("../combinators/sequences");
exports.space = str_1.str(' ');
exports.tab = str_1.str('\t');
exports.newline = str_1.str('\n');
exports.whitespace = multiples_1.atLeast(1)(choices_1.oneOf(exports.space, exports.tab));
exports.whitespaceMultiline = multiples_1.atLeast(1)(choices_1.oneOf(exports.space, exports.tab, exports.newline));
exports.optionalWhitespace = multiples_1.many(choices_1.oneOf(exports.space, exports.tab));
exports.optionalWhitespaceMultiline = multiples_1.many(choices_1.oneOf(exports.space, exports.tab, exports.newline));
var joinAll = function (results) { return results.join(''); };
exports.letters = multiples_1.many(regexp_1.letter).map(joinAll);
exports.lettersLower = multiples_1.many(regexp_1.letterLower).map(joinAll);
exports.lettersUpper = multiples_1.many(regexp_1.letterUpper).map(joinAll);
exports.lettersLatin = multiples_1.many(regexp_1.letterLatin).map(joinAll);
exports.lettersLatinLower = multiples_1.many(regexp_1.letterLatinLower).map(joinAll);
exports.lettersLatinUpper = multiples_1.many(regexp_1.letterLatinUpper).map(joinAll);
exports.lettersLatinExt = multiples_1.many(regexp_1.letterLatinExt).map(joinAll);
exports.lettersLatinExtLower = multiples_1.many(regexp_1.letterLatinExtLower).map(joinAll);
exports.lettersLatinExtUpper = multiples_1.many(regexp_1.letterLatinExtUpper).map(joinAll);
exports.digits = multiples_1.many(regexp_1.digit).map(joinAll);
exports.digitsNonzero = multiples_1.many(regexp_1.digitNonzero).map(joinAll);
exports.decimalUint = choices_1.oneOf(str_1.str('0'), sequences_1.sequenceOf(regexp_1.digitNonzero, exports.digits).map(joinAll)).map(parseInt);
exports.decimalInt = choices_1.oneOf(exports.decimalUint, sequences_1.sequenceOf(str_1.str('+'), exports.decimalUint).map(function (_a) {
    var _ = _a[0], result = _a[1];
    return result;
}), sequences_1.sequenceOf(str_1.str('-'), exports.decimalUint).map(function (_a) {
    var _ = _a[0], result = _a[1];
    return -result;
}));
exports.decimalUfloat = choices_1.oneOf(sequences_1.sequenceOf(str_1.str('0'), str_1.str('.'), exports.digits).map(joinAll), sequences_1.sequenceOf(regexp_1.digitNonzero, exports.digits, str_1.str('.'), exports.digits).map(joinAll), str_1.str('0'), sequences_1.sequenceOf(regexp_1.digitNonzero, exports.digits).map(joinAll)).map(parseFloat);
exports.decimalFloat = choices_1.oneOf(exports.decimalUfloat, sequences_1.sequenceOf(str_1.str('+'), exports.decimalUfloat).map(function (_a) {
    var _ = _a[0], result = _a[1];
    return result;
}), sequences_1.sequenceOf(str_1.str('-'), exports.decimalUfloat).map(function (_a) {
    var _ = _a[0], result = _a[1];
    return -result;
}));
