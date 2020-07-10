import { Parser } from './../parser';
/**
 * Takes in multiple parsers and returns a parser that matches all of them one after another
 * It succeeds if all parsers succeed, the result is an array of all results
 * @param parsers Parsers to be sequenced
 */
export declare const sequenceOf: (...parsers: Array<Parser<any>>) => Parser<any>;
interface SurroundTriple<L, M, R> {
    left: L;
    middle: M;
    right: R;
}
/**
 * Takes left and right parsers and then a middle parser and returns a new parser which matches the match of the middle parser surrounded by matches of left and right parsers
 * The result is an object with properties: left, middle, right
 * @param leftParser A parser matching content to the left of middleParser
 * @param rightParser A parser matching content to the left of middleParser
 * @param middleParser A parser matching middle of the content
 */
export declare const surroundedBy: <L, R>(leftParser: Parser<L>, rightParser: Parser<R>) => <M>(middleParser: Parser<M>) => Parser<SurroundTriple<L, M, R>>;
/**
 * Takes left and right parsers and then a middle parser and returns a new parser which matches the match of the middle parser surrounded by matches of left and right parsers.
 * After that it extracts the result of the middle parser
 * @param leftParser A parser matching content to the left of middleParser
 * @param rightParser A parser matching content to the left of middleParser
 * @param middleParser A parser matching middle of the content and thus the result
 */
export declare const surroundedByExtract: <L, R>(leftParser: Parser<L>, rightParser: Parser<R>) => <M>(middleParser: Parser<M>) => Parser<M>;
export {};
