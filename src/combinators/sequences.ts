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

interface SurroundTriple<L, M, R> {
  left: L
  middle: M
  right: R
}

/**
 * Takes left and right parsers and then a middle parser and returns a new parser which matches the match of the middle parser surrounded by matches of left and right parsers
 * The result is an object with properties: left, middle, right
 * @param leftParser A parser matching content to the left of middleParser
 * @param rightParser A parser matching content to the left of middleParser
 * @param middleParser A parser matching middle of the content
 */
export const surroundedBy = <L, R>(
  leftParser: Parser<L>,
  rightParser: Parser<R>
) => <M>(middleParser: Parser<M>): Parser<SurroundTriple<L, M, R>> =>
  sequenceOf(
    leftParser,
    middleParser,
    rightParser
  ).map(([left, middle, right]) => ({ left, middle, right }))
