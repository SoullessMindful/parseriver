import { ResultState } from './../state'
import { Parser } from '../parser'

/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It succeeds exatly when the given parser succeeds and the results are the same
 * @param parser The parser to be matched without consuming input
 */
export const peek = <T>(parser: Parser<T>): Parser<T | undefined> =>
  Parser.from((state) => {
    const nextState = parser.apply(state)

    if (nextState.__type__ === 'ErrorState') {
      return nextState
    }

    return ResultState.update(state, nextState.result, 0)
  })
