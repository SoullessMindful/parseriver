import { Parser } from './../parser'
import { ValidState, IntermediateState, ResultState, ErrorState } from '../state'

export const str = (pattern: string): Parser<string> =>
  Parser.of((state: ValidState<any>): IntermediateState<string> => {
    const {
      text,
      index
    } = state

    const shift = pattern.length

    if (text.startsWith(pattern)) {
      return ResultState(
        pattern,
        text.slice(shift),
        index + shift
      )
    }

    return ErrorState(
      `str: was looking for "${pattern}", found "${text.slice(0, shift)}"`,
      index
    )
  })
