import * as fc from 'fast-check'

const sqr = (n: number): number => n ** 2

describe('Testing test', () => {
  test('if it all works', () => {
    expect(sqr(3)).toBe(9)
  })

  test('if fast check also works', () => {
    fc.assert(
      fc.property(
        fc.nat(),
        (n) => sqr(n) >= n
      )
    )
  })
})
