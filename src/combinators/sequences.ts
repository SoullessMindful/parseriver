import { ParserState, ResultState } from './../state'
import { Parser } from './../parser'

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
