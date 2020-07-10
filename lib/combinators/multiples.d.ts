import { Parser } from './../parser';
/**
 * Takes a parser and makes it into a new one working the same way as the original one, except it can never fail
 * @param parser A parser to be optionalized
 */
export declare const optional: <T>(parser: Parser<T>) => Parser<T>;
/**
 * Takes two numbers and parser and returns a parser, that tries too match the given parser the amount of times between the two given numbers
 * It fails only when when there is too little matches
 * In case there is too many matches it just stops parsing
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param parser A parser to be repeatedly matched
 */
export declare const between: <T>(lowerBound: number, upperBound: number) => (parser: Parser<T>) => Parser<T[]>;
/**
 * Takes a number and parser and returns a parser, that tries to match the given parser at least the given number times
 * It fails only when when there is too little matches
 * @param lowerBound A minimal number of matches
 * @param parser A parser to be repeatedly matched
 */
export declare const atLeast: <T>(lowerBound: number) => (parser: Parser<T>) => Parser<T[]>;
/**
 * Takes a number and parser and returns a parser, that tries to match the given parser repeatedly at most the given number times
 * It never fails, in case there is too many matches it just stops parsing
 * @param upperBound A maximal number of matches
 * @param parser A parser to be repeatedly matched
 */
export declare const atMost: <T>(upperBound: number) => (parser: Parser<T>) => Parser<T[]>;
/**
 * Takes a parser and returns a parser, that tries to match the given parser until it fails
 * It never fails, if there are no matches the result is an empty array
 * @param parser A parser to be repeatedly matched
 */
export declare const many: <T>(parser: Parser<T>) => Parser<T[]>;
/**
 * Takes a number and a parser and returns a parser, that tries to match the given parser exactly the given number times
 * It fails only when when there is too little matches
 * In case there is too many matches it just stops parsing
 * @param parser A parser to be repeatedly matched
 */
export declare const exactly: <T>(times: number) => (parser: Parser<T>) => Parser<T[]>;
