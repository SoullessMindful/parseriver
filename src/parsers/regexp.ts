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

const A_LETTER_IN_FRONT = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]/
// Latin extended characters without C, D and E blocks

export const letter = regexp('letter', A_LETTER_IN_FRONT)

const A_LETTER_LATIN_IN_FRONT = /^[a-zA-Z]/

export const letterLatin = regexp('letterLatin', A_LETTER_LATIN_IN_FRONT)
