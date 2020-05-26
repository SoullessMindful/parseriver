export declare type ParserState<T> = OkState<T> | ErrorState;
export declare type OkState<T> = InitialState | ResultState<T>;
interface InitialState {
    readonly __type__: 'InitialState';
    readonly index: 0;
    readonly text: string;
}
export declare const InitialState: (text: string) => InitialState;
interface ResultState<T> {
    readonly __type__: 'ResultState';
    readonly result: T;
    readonly text: string;
    readonly index: number;
}
interface ErrorState {
    readonly __type__: 'ErrorState';
    readonly msg: string;
    readonly index: number;
}
export {};
