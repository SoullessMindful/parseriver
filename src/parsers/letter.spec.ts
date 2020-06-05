import { letter } from './letter'
import each from 'jest-each'
import fc from 'fast-check'
import { ValidState } from '../state'

describe('letter: Unit testing', () => {
  each([
    ['Letter', 'L'],
    ['head', 'h'],
    ['tail', 't'],
    ['rDay1', 'r'],
    ['ż23 i81', 'ż']
  ]).test('if it properly parses a letter',
    (text: string, expected: string) => {
      const state = letter.run(text)

      expect(state.__type__).toEqual('ResultState')
      expect(state.index).toBe(1)

      if (state.__type__ === 'ResultState') {
        expect(state.result).toEqual(expected)
      }
    }
  )

  each([
    [' whiteSpace'],
    ['  whiteSpace'],
    ['_not a Letter'],
    ['\nhead'],
    ['\ttail'],
    ['-r  1 Day1'],
    ['23ż i81']
  ]).test('if it properly return an error when the input doesn\'t start with a letter',
    (text: string) => {
      const state = letter.run(text)

      expect(state.__type__).toEqual('ErrorState')
      expect(state.index).toBe(0)
    }
  )
})

describe('letter: Property testing', () => {
  test('if the result is the first character of a string in a positive case', () => {
    fc.assert(
      fc.property(fc.string(), fc.anything(), fc.nat(),
        (text, prevResult, prevIndex) => {
          const prevState: ValidState<any> = {
            __type__: 'ResultState',
            result: prevResult,
            index: prevIndex,
            text
          }
          const state = letter.apply(prevState)

          return (
            !(state.__type__ === 'ResultState') ||
            state.result === text.charAt(0)
          )
        }
      )
    )
  })
})
