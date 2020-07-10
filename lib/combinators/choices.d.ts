import { Parser } from './../parser';
/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state one after another until one of them succeeds
 * The result is the result on the first parser that succeeds
 * Fails when none of the parsers succeeds
 * @param parsers Parsers to be tried one after another
 */
export declare const oneOf: (...parsers: Array<Parser<any>>) => Parser<any>;
/**
 * Takes in multiple parsers and returns a parser that tries to match them to the input state in parallel
 * Succeed if exactly one of the parsers succeeds, fails otherwise
 * The result is the result of the only successful parser
 * @param parsers Parsers to be tried one after another
 */
export declare const onlyOneOf: (...parsers: Array<Parser<any>>) => Parser<any>;
