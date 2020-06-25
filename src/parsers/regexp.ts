import { Parser } from '../parser'
import {
  ValidState,
  IntermediateState,
  ResultState,
  ErrorState
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

// Matches latin extended letter without C, D and E blocks
const A_LETTER_IN_FRONT = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]/

/**
 * parses a latin extended letter
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
