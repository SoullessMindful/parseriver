import { Parser } from './../parser'
import { ResultState } from '../state'

/**
 * Takes a parser and makes it into a new one working the same way as the original one, except it can never fail
 * @param parser A parser to be optionalized
 */
export const optional = <T>(parser: Parser<T>): Parser<T> =>
  Parser.from((state) => {
    const nextState = parser.apply(state)

    if (nextState.__type__ === 'ErrorState') {
      return state.__type__ === 'InitialState'
        ? ResultState.update(state, undefined, 0)
        : state
    }

    return nextState
  })
