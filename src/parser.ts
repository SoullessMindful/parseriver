import { ParserState, ValidState, IntermediateState, InitialState, ResultState, ErrorState } from './state'

export class Parser<T> {
  private readonly func: (state: ValidState<any>) => IntermediateState<T>

  private constructor (func: (state: ValidState<any>) => IntermediateState<T>) {
    this.func = func
  }

  apply (state: ParserState<any>): IntermediateState<T> {
    if (state.__type__ === 'ErrorState') return state

    return this.func(state)
  }

  run (text: string): IntermediateState<T> {
    const initialState = InitialState(text)

    return this.apply(initialState)
  }

  map<R> (callback: (result: T) => R): Parser<R> {
    return Parser.from((state) => {
      const nextState = this.func(state)

      if (nextState.__type__ === 'ErrorState') return nextState

      return ResultState.update(
        nextState,
        callback(nextState.result),
        0
      )
    })
  }

  bind<R> (transform: (result: T) => Parser<R>): Parser<R> {
    return Parser.from((state) => {
      const nextState = this.func(state)

      if (nextState.__type__ === 'ErrorState') return nextState

      return transform(nextState.result).func(nextState)
    })
  }

  static from<T> (func: (state: ValidState<any>) => IntermediateState<T>): Parser<T> {
    return new Parser<T>(func)
  }

  static of<T> (result: T): Parser<T> {
    return Parser.from((state) => ResultState.update(
      state,
      result,
      0
    ))
  }

  static zero (msg: string): Parser<any> {
    return Parser.from((state) => ErrorState(
      state,
      msg
    ))
  }
}

export const success = Parser.of

export const failure = Parser.zero
