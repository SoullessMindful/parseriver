import { ValidState } from './../state'
import { str } from './str'
import each from 'jest-each'
import * as fc from 'fast-check'

describe('str: Unit testing', () => {
  each([
    ['Drink', 'Drink milk!', 'Drink'],
    ['ex0', 'ex0', 'ex0'],
    ['sAMple1', 'sAMple123', 'sAMple1'],
    ['3go2', '3go2az5', '3go2'],
    ['a x s,d', 'a x s,d,e,f,g,h ijk', 'a x s,d'],
  ]).test(
    'if it properly parses correct string',
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
    ['lead&trail', '_lead&trail#'],
  ]).test(
    'if it properly returns an error when parsing incorrect string',
    (pattern: string, text: string) => {
      const parser = str(pattern)
      const state = parser.run(text)

      expect(state.__type__).toEqual('ErrorState')
      expect(state.index).toBe(0)
    }
  )
})

describe('str: Property testing', () => {
  test('if it properly parses correct string', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        fc.anything(),
        fc.nat(),
        (pattern, remainder, prevResult, prevIndex) => {
          const parser = str(pattern)
          const prevState: ValidState<any> = {
            __type__: 'ResultState',
            result: prevResult,
            index: prevIndex,
            text: pattern + remainder,
          }
          const state = parser.apply(prevState)

          return (
            state.__type__ === 'ResultState' && // returned ParserState is a ResultState
            state.result === pattern && // the tested string is a result
            state.index === prevIndex + pattern.length
          ) // the index has shifted by the length of the tested string
        }
      )
    )
  })
  test('if it properly returns an error when parsing incorrect string', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        fc.string(),
        fc.anything(),
        fc.nat(),
        (pattern, remainder, prefix, prevResult, prevIndex) => {
          const parser = str(pattern)
          const prevState: ValidState<any> = {
            __type__: 'ResultState',
            result: prevResult,
            index: prevIndex,
            text: prefix + pattern + remainder,
          }
          const state = parser.apply(prevState)

          if (prefix === '' || (prefix + pattern).startsWith(pattern))
            return true // exclude cases when input might be correct

          return (
            state.__type__ === 'ErrorState' && state.index === prevIndex // returned ParserState is an ErrorState
          ) // the index has not changed
        }
      )
    )
  })
})
