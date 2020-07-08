import { Parser } from '../parser'
import { ErrorState, ResultState } from '../state'

/**
 * A parser that matches end of input
 * Fails when there is still input left
 */
export const endOfInput = Parser.from((state) => {
  if (state.text.length > 0) {
    return ErrorState(
      state,
      `Parser endOfInput: expected end of input but found "${state.text.charAt(
        0
      )}"`
    )
  }

  return ResultState.update(state, undefined, 0)
})
