import { Parser } from '../parser'
import { ParserState, ResultState, ErrorState } from '../state'

/**
 * Matches the second of the given parsers multiple times, separated by the first of the given parsers
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export const separatedBy = <T, S>(
  separator: Parser<S>,
  trailing: 'always' | 'never' | 'optional' = 'never'
) => (parser: Parser<T>): Parser<T[]> => {
  return Parser.from((state) => {
    const results = []
    let currState: ParserState<S>
    let nextValState: ParserState<T>
    let nextSepState: ParserState<S> = state

    while (true) {
      currState = nextSepState
      nextValState = parser.apply(currState)
      nextSepState = separator.apply(nextValState)

      if (nextValState.__type__ === 'ErrorState') {
        break
      }

      if (nextSepState.__type__ === 'ResultState' && trailing === 'never') {
        currState = ErrorState(
          nextValState,
          'Combinator separatedBy: trailing separator found'
        )
        break
      }

      if (nextSepState.__type__ === 'ErrorState' && trailing === 'always') {
        currState = ErrorState(
          nextValState,
          'Combinator separatedBy: trailing separator not found'
        )
        break
      }

      results.push(nextValState.result)

      if (nextSepState.__type__ === 'ErrorState' && trailing === 'optional') {
        break
      }
    }

    if (
      currState.__type__ === 'ResultState' ||
      currState.__type__ === 'InitialState'
    ) {
      return ResultState.update(currState, results, 0)
    }

    return ErrorState(state, currState.msg)
  })
}
