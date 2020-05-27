import { Parser } from './../parser'
import { ValidState, IntermediateState, ResultState, ErrorState } from '../state'

export const str = (pattern: string): Parser<string> =>
  Parser.of((state: ValidState<any>): IntermediateState<string> => {
    const {
      text
    } = state

    const shift = pattern.length

    if (text.startsWith(pattern)) {
      return ResultState.update(
        state, // updated state
        pattern, // result
        shift // shift
      )
    }

    return ErrorState(
      state,
      `str: was looking for "${pattern}", found "${text.slice(0, shift)}"`
    )
  })
