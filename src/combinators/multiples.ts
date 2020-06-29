import { ValidState, ParserState, ErrorState } from './../state'
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

/**
 * Takes two numbers and parser and returns a parser, that tries too match the given parser the amount of times between the two given numbers
 * It fails only when when there too little matches
 * In case there is too many matches it just stops parsing
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param parser A parser to be repeatedly matched
 */
export const between = <T>(lowerBound: number, upperBound: number) => (parser: Parser<T>): Parser<T[]> => {
  return Parser.from((state) => {
    // In this combinator using mutable state is actually a good idea
    const results = []
    let currState: ValidState<T>
    let nextState: ParserState<T> = state
    let i = 0

    while (true) {
      currState = nextState
      nextState = parser.apply(currState)
      if (nextState.__type__ === 'ErrorState' || i > upperBound) {
        break
      } else {
        results.push(nextState.result)
        i++
      }
    }
    if (lowerBound <= i) {
      return ResultState.update(currState, results, 0)
    }

    return ErrorState(state, `Combinator between: Should have found from ${lowerBound} to ${upperBound} matches, but found ${i}`)
  })
}
