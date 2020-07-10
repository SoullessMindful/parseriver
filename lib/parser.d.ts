import { ParserState, ValidState, IntermediateState } from './state';
export declare class Parser<T> {
    private readonly func;
    private constructor();
    apply(state: ParserState<any>): IntermediateState<T>;
    run(text: string): IntermediateState<T>;
    map<R>(callback: (result: T) => R): Parser<R>;
    bind<R>(transform: (result: T) => Parser<R>): Parser<R>;
    static from<T>(func: (state: ValidState<any>) => IntermediateState<T>): Parser<T>;
    static of<T>(result: T): Parser<T>;
    static zero(msg: string): Parser<any>;
    static recursive<T>(parserProvider: () => Parser<T>): Parser<T>;
}
export declare const success: typeof Parser.of;
export declare const failure: typeof Parser.zero;
export declare const recursive: typeof Parser.recursive;
