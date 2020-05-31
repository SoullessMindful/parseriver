import { letter } from './letter'
import each from 'jest-each'

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
      expect(state.__type__).toBe(1)

      if (state.__type__ === 'ResultState') {
        expect(state.result).toEqual(expected)
      }
    }
  )
})
