import { Parser } from './../parser'
import { ErrorState, ResultState } from '../state'

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
      `Combinator oneOf: none of the below parsers succeeded:\n  ${msg}`
    )
  })

/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state in parallel
 * Succeed if exactly one of the parsers succeeds, fails otherwise
 * The result is the result of the only successful parser
 * @param parsers Parsers to be tried one after another
 */
export const onlyOneOf = (...parsers: Array<Parser<any>>): Parser<any> =>
  Parser.from((state) => {
    const nextStates = parsers.map((parser) => parser.apply(state))

    const resultStates = nextStates.filter(
      (nextState) => nextState.__type__ === 'ResultState'
    ) as Array<ResultState<any>>

    const errorStates = nextStates.filter(
      (nextState) => nextState.__type__ === 'ResultState'
    ) as ErrorState[]

    switch (resultStates.length) {
      case 0: {
        const msg = errorStates
          .map((errorState: ErrorState) => errorState.msg)
          .join(',\n  ')
        return ErrorState(
          state,
          `Combinator onlyOneOf: none of the below parsers succeeded\n  ${msg}`
        )
      }
      case 1:
        return resultStates[0]
      default:
        return ErrorState(
          state,
          'Combinator onlyOneOf: there were too many matches'
        )
    }
  })
