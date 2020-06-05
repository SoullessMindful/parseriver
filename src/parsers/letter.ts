import { Parser } from './../parser'
import { ValidState, IntermediateState, ResultState, ErrorState } from '../state'

const A_LETTER_IN_FRONT = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]/
// Latin extended characters without C, D and E blocks

export const letter = Parser.from((state: ValidState<any>): IntermediateState<string> => {
  const match = state.text.match(A_LETTER_IN_FRONT)

  if (match != null) {
    return ResultState.update(
      state,
      state.text.charAt(0),
      1
    )
  }
  return ErrorState(state, `Parser letter: was trying to parse a letter but found "${state.text.charAt(0)}" instead`)
})
