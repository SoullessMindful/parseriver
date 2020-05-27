import { Parser } from './../parser'
import { ValidState, IntermediateState } from '../state'

export const str = (pattern: string): Parser<string> =>
  Parser.of((state: ValidState<any>): IntermediateState<string> => {
    return {
      __type__: 'ErrorState',
      msg: 'Not Implemented',
      index: 0
    }
  })
