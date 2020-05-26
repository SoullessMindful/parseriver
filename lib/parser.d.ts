import { ParserState, OkState } from './state';
export declare class Parser<T> {
    private readonly func;
    private constructor();
    apply(state: ParserState<any>): ParserState<T>;
    run(text: string): ParserState<T>;
    static of<T>(func: (state: OkState<any>) => OkState<T>): Parser<T>;
}
