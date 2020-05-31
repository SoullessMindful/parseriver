import { Parser } from './../parser'
import { ValidState, IntermediateState, ResultState, ErrorState } from '../state'

export const letter = Parser.of((state: ValidState<any>): IntermediateState<string> =>
  ErrorState(state, 'letter: Not implemented')
)
