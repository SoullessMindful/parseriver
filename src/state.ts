export type ParserState<T> = InitialState | ResultState<T> | ErrorState
export type IntermediateState<T> = ResultState<T> | ErrorState
export type ValidState<T> = InitialState | ResultState<T>

interface InitialState {
  readonly __type__: 'InitialState'
  readonly index: 0
  readonly text: string
}

export const InitialState = (text: string): InitialState => ({
  __type__: 'InitialState',
  index: 0,
  text
})

interface ResultState<T> {
  readonly __type__: 'ResultState'
  readonly result: T
  readonly index: number
  readonly text: string
}

export const ResultState = <T>(result: T, text: string, index: number): ResultState<T> => ({
  __type__: 'ResultState',
  result,
  index,
  text
})

ResultState.update = <T>(prevState: ValidState<any>, result: T, shift: number) => ResultState(
  result,
  prevState.text.slice(shift),
  prevState.index + shift
)

interface ErrorState {
  readonly __type__: 'ErrorState'
  readonly msg: string
  readonly index: number
}

export const ErrorState = (prevState: ValidState<any>, msg: string): ErrorState => ({
  __type__: 'ErrorState',
  msg,
  index: prevState.index
})
