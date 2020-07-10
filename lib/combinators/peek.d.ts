import { ParserState } from './../state';
import { Parser } from '../parser';
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It succeeds exatly when the given parser succeeds and the results are the same
 * @param parser The parser to be matched without consuming input
 */
export declare const peek: <T>(parser: Parser<T>) => Parser<T | undefined>;
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It never fails
 * If the given parser succeeds the result is the same as its result
 * Otherwise the result is undefined
 * @param parser The parser to be matched without consuming input
 */
export declare const peekSafe: <T>(parser: Parser<T>) => Parser<T | undefined>;
/**
 * Takes in a parser and returns a parser that tries to match the given parser, but doesn't consume the input text
 * It never fails, the result is the state after matching the given parser
 * @param parser The parser to be matched without consuming input
 */
export declare const peekState: <T>(parser: Parser<T>) => Parser<ParserState<T>>;
