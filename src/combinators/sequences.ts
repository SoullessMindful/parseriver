import { ParserState, ResultState } from './../state'
import { Parser } from './../parser'

/**
 * Takes in multiple parsers and returns a parser that matches all of them one after another
 * It succeeds if all parsers succeed, the result is an array of all results
 * @param parsers Parsers to be sequenced
 */
export const sequenceOf = (...parsers: Array<Parser<any>>): Parser<any> =>
  Parser.from((state) => {
    const results = []
    let nextState: ParserState<any> = state

    for (const parser of parsers) {
      nextState = parser.apply(nextState)
      if (nextState.__type__ === 'ResultState') {
        results.push(nextState.result)
      } else break
    }

    if (
      nextState.__type__ === 'ResultState' ||
      nextState.__type__ === 'InitialState'
    ) {
      return ResultState.update(nextState, results, 0)
    }

    return nextState
  })
