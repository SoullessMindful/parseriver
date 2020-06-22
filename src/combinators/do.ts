import { Parser, success } from '../parser'

/**
 * Allows to pipe parser with a syntax similar to async/await
 * @param generator The generator function in which body one can combine parsers
 * @returns The Parser that performs all operations combined
 */
export const $do = <R>(generator: () => Iterator<Parser<any>, R, any>): Parser<R> => {
  const iterator = generator()

  const loop = (result: any): Parser<any> => {
    const iteratorResult = iterator.next(result)
    if (iteratorResult.done === true) {
      return success(iteratorResult.value)
    }

    return iteratorResult.value.bind(loop)
  }

  return loop(undefined)
}
