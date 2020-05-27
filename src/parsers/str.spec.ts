import { str } from './str'
import each from 'jest-each'

describe('str: Unit testing', () => {
  each([
    ['Drink', 'Drink milk!', 'Drink'],
    ['ex0', 'ex0', 'ex0'],
    ['sAMple1', 'sAMple123', 'sAMple1'],
    ['3go2', '3go2az5', '3go2'],
    ['a x s,d', 'a x s,d,e,f,g,h ijk', 'a x s,d']
  ]).test('if it properly parses correct string',
    (pattern: string, text: string, expected: string) => {
      const parser = str(pattern)
      const state = parser.run(text)

      expect(state.__type__).toEqual('ResultState')
      expect(state.index).toBe(pattern.length)

      if (state.__type__ === 'ResultState') {
        const actual = state.result
        expect(actual).toEqual(expected)
      }
    }
  )

  each([
    ['Drink', 'drink milk!'],
    ['fail', 'it fails miserably'],
    ['tooShort 867', 'tooSho'],
    ['MisMatch', 'MisMatxh'],
    ['lead&trail', '_lead&trail#']
  ]).test('if it properly returns an error when parsing incorrect string',
    (pattern: string, text: string) => {
      const parser = str(pattern)
      const state = parser.run(text)

      expect(state.__type__).toEqual('ErrorState')
      expect(state.index).toBe(0)
    }
  )
})

describe('str: Property testing', () => {

})
