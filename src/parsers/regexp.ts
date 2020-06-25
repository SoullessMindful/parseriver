import { Parser } from '../parser'
import {
  ValidState,
  IntermediateState,
  ResultState,
  ErrorState
} from '../state'

const regexp = (name: string, r: RegExp): Parser<string> =>
  Parser.from(
    (state: ValidState<any>): IntermediateState<string> => {
      const match = state.text.match(r)
      if (match != null) {
        return ResultState.update(state, state.text.charAt(0), 1)
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
