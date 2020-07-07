import { Parser } from '../parser'
import { ParserState, ResultState, ErrorState } from '../state'

/**
 * Matches the second of the given parsers between lowerBound and upperBound times, separated by the first of the given parsers
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export const separatedByBetween = <S>(
  lowerBound: number,
  upperBound: number
) => (
  separator: Parser<S>,
  trailing: 'always' | 'never' | 'optional' = 'never'
) => <T>(parser: Parser<T>): Parser<T[]> =>
  Parser.from((state) => {
    const results = []
    let currState: ParserState<S | T>
    let nextValState: ParserState<T> = state
    let nextSepState: ParserState<S> = state

    while (true) {
      currState = nextValState
      nextValState = parser.apply(nextSepState)

      if (
        nextValState.__type__ === 'ErrorState' ||
        results.length >= upperBound
      ) {
        if (trailing !== 'never') {
          currState = nextSepState
        }

        break
      }

      currState = nextSepState
      nextSepState = separator.apply(nextValState)

      if (nextSepState.__type__ === 'ErrorState') {
        if (trailing !== 'always') {
          currState = nextValState
          results.push(nextValState.result)
        }

        break
      }

      results.push(nextValState.result)
    }

    if (results.length >= lowerBound) {
      return ResultState.update(currState, results, 0)
    }

    return ErrorState(
      state,
      `Combinator separatedByBetween: Should have found from ${lowerBound} to ${upperBound} matches, but found ${results.length}`
    )
  })

/**
 * Matches the second of the given parsers multiple times, separated by the first of the given parsers
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export const separatedBy = separatedByBetween(0, Infinity)
