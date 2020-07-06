import { success, failure } from './../parser'
import { Parser } from '../parser'
import {
  ValidState,
  IntermediateState,
  ResultState,
  ErrorState,
} from '../state'

/**
 * Parser that checks if a given regular expression is matched by the parsed text
 * @param name A name of resulting parser for the purpose of creating error messages
 * @param r A regular expression to be tested
 */
const regexp = (name: string, r: RegExp): Parser<string> =>
  Parser.from(
    (state: ValidState<any>): IntermediateState<string> => {
      const match = state.text.match(r)
      if (match != null) {
        return ResultState.update(state, match[0], match[0].length)
      }
      return ErrorState(
        state,
        `Parser ${name}: was trying to parse ${name} but found "${state.text.charAt(
          0
        )}" instead`
      )
    }
  )

// Matches all cased letters
const A_LETTER_IN_FRONT = /^[A-Za-z\xB5\xC0-\xD6\xD8-\xF6\xF8-\u01BA\u01BC-\u01BF\u01C4-\u0293\u0295-\u02AF\u0370-\u0373\u0376\u0377\u037B-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0560-\u0588\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FD-\u10FF\u13A0-\u13F5\u13F8-\u13FD\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2134\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C7B\u2C7E-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA640-\uA66D\uA680-\uA69B\uA722-\uA76F\uA771-\uA787\uA78B-\uA78E\uA790-\uA7BF\uA7C2-\uA7C6\uA7FA\uAB30-\uAB5A\uAB60-\uAB67\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A]/

/**
 * parses a cased letter
 */
export const letter = regexp('letter', A_LETTER_IN_FRONT)

// Matches a latin letter
const A_LETTER_LATIN_IN_FRONT = /^[a-zA-Z]/

/**
 * parses a latin letter
 */
export const letterLatin = regexp('letterLatin', A_LETTER_LATIN_IN_FRONT)

// Matches an uppercase latin letter
const A_LETTER_LATIN_UPPER_IN_FRONT = /^[A-Z]/

/**
 * parses an uppercase latin letter
 */
export const letterLatinUpper = regexp(
  'letterLatinUpper',
  A_LETTER_LATIN_UPPER_IN_FRONT
)

// Matches a lowercase latin letter
const A_LETTER_LATIN_LOWER_IN_FRONT = /^[a-z]/

/**
 * parses a lowercase latin letter
 */
export const letterLatinLower = regexp(
  'letterLatinLower',
  A_LETTER_LATIN_LOWER_IN_FRONT
)

// Matches latin extended letter without C, D and E blocks
const A_LETTER_LATIN_EXTENDED_IN_FRONT = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]/

/**
 * parses a latin extended letter
 */
export const letterLatinExt = regexp(
  'letterLatinExt',
  A_LETTER_LATIN_EXTENDED_IN_FRONT
)

export const letterLatinExtUpper = letterLatinExt.bind((l) =>
  l.toUpperCase() === l
    ? success(l)
    : failure(
        `Parser letterLatinExtUpper: Was trying to parse an uppercase latin extended letter, but found ${l}`
      )
)

export const letterLatinExtLower = letterLatinExt.bind((l) =>
  l.toLowerCase() === l
    ? success(l)
    : failure(
        `Parser letterLatinExtLower: Was trying to parse a lowercase latin extended letter, but found ${l}`
      )
)

// Matches a digit
const A_DIGIT_IN_FRONT = /^[0-9]/

/**
 * parses a digit
 */
export const digit = regexp('digit', A_DIGIT_IN_FRONT)

// Matches a nonzero digit
const A_DIGIT_NONZERO_IN_FRONT = /^[1-9]/

/**
 * parses a digit, except for 0
 */
export const digitNonzero = regexp('digitNonzero', A_DIGIT_NONZERO_IN_FRONT)
