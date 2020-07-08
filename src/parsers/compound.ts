import { str } from './str'
import { atLeast, many } from '../combinators/multiples'
import { oneOf } from '../combinators/choices'
import {
  letter,
  letterLower,
  letterUpper,
  letterLatin,
  letterLatinLower,
  letterLatinUpper,
  letterLatinExt,
  letterLatinExtLower,
  letterLatinExtUpper,
  digit,
  digitNonzero,
} from './regexp'
import { sequenceOf } from '../combinators/sequences'
import { Parser } from '../parser'

export const space = str(' ')
export const tab = str('\t')
export const newline = str('\n')

export const whitespace = atLeast(1)(oneOf(space, tab))
export const whitespaceMultiline = atLeast(1)(oneOf(space, tab, newline))
export const optionalWhitespace = many(oneOf(space, tab))
export const optionalWhitespaceMultiline = many(oneOf(space, tab, newline))

const joinAll = (results: string[]): string => results.join('')

export const letters = many(letter).map(joinAll)
export const lettersLower = many(letterLower).map(joinAll)
export const lettersUpper = many(letterUpper).map(joinAll)
export const lettersLatin = many(letterLatin).map(joinAll)
export const lettersLatinLower = many(letterLatinLower).map(joinAll)
export const lettersLatinUpper = many(letterLatinUpper).map(joinAll)
export const lettersLatinExt = many(letterLatinExt).map(joinAll)
export const lettersLatinExtLower = many(letterLatinExtLower).map(joinAll)
export const lettersLatinExtUpper = many(letterLatinExtUpper).map(joinAll)

export const digits = many(digit).map(joinAll)
export const digitsNonzero = many(digitNonzero).map(joinAll)

export const decimalUint = oneOf(
  str('0'),
  sequenceOf(digitNonzero, digits).map(joinAll)
).map(parseInt)

export const decimalInt: Parser<number> = oneOf(
  decimalUint,
  sequenceOf(str('+'), decimalUint).map(([_, result]) => result),
  sequenceOf(str('-'), decimalUint).map(([_, result]) => -result)
)

export const decimalUfloat = oneOf(
  str('0'),
  sequenceOf(digitNonzero, digits).map(joinAll),
  sequenceOf(digitNonzero, digits, str('.'), digits).map(joinAll)
).map(parseFloat)

export const decimalFloat: Parser<number> = oneOf(
  decimalUfloat,
  sequenceOf(str('+'), decimalUfloat).map(([_, result]) => result),
  sequenceOf(str('-'), decimalUfloat).map(([_, result]) => -result)
)
