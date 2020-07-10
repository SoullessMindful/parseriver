export declare type ParserState<T> = InitialState | ResultState<T> | ErrorState;
export declare type IntermediateState<T> = ResultState<T> | ErrorState;
export declare type ValidState<T> = InitialState | ResultState<T>;
export interface InitialState {
    readonly __type__: 'InitialState';
    readonly index: 0;
    readonly text: string;
}
export declare const InitialState: (text: string) => InitialState;
export interface ResultState<T> {
    readonly __type__: 'ResultState';
    readonly result: T;
    readonly index: number;
    readonly text: string;
}
export declare const ResultState: {
    <T>(result: T, text: string, index: number): ResultState<T>;
    update<T_1>(prevState: ValidState<any>, result: T_1, shift: number): ResultState<T_1>;
};
export interface ErrorState {
    readonly __type__: 'ErrorState';
    readonly msg: string;
    readonly index: number;
}
export declare const ErrorState: (prevState: ValidState<any>, msg: string) => ErrorState;
