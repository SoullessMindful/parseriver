import { Parser } from './../parser'
import { ErrorState } from '../state'

/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state one after another until one of them succeeds
 * The result is the result on the first parser that succeeds
 * Fails when none of the parsers succeeds
 * @param parsers Parsers to be tried one after another
 */
export const oneOf = (...parsers: Array<Parser<any>>): Parser<any> =>
  Parser.from((state) => {
    const msgs = []

    for (const parser of parsers) {
      const nextState = parser.apply(state)
      if (nextState.__type__ === 'ResultState') {
        return nextState
      } else {
        msgs.push(nextState.msg)
      }
    }

    const msg = msgs.join(',\n  ')

    return ErrorState(
      state,
      `Combinator choice: none of the below parsers succeeded:\n  ${msg}`
    )
  })
