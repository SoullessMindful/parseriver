import { Parser } from '../parser';
/**
 * Parser that checks if a given regular expression is matched by the parsed text
 * The result is the whole match object, includind group
 * @param r A regular expression to be tested, it should start with "^"
 * @param name A name of resulting parser for the purpose of creating error messages
 */
export declare const regexpMatch: (r: RegExp, name?: string) => Parser<RegExpMatchArray>;
/**
 * Parser that checks if a given regular expression is matched by the parsed text
 * The result is the matched text
 * @param r A regular expression to be tested, it should start with "^"
 * @param name A name of resulting parser for the purpose of creating error messages
 */
export declare const regexp: (r: RegExp, name?: string) => Parser<string>;
/**
 * parses any character
 * fails only if there is end of input
 */
export declare const anyChar: Parser<string>;
/**
 * parses a cased letter
 */
export declare const letter: Parser<string>;
/**
 * parses an uppercase letter
 */
export declare const letterUpper: Parser<string>;
/**
 * parses a lowercase letter
 */
export declare const letterLower: Parser<string>;
/**
 * parses a latin letter
 */
export declare const letterLatin: Parser<string>;
/**
 * parses an uppercase latin letter
 */
export declare const letterLatinUpper: Parser<string>;
/**
 * parses a lowercase latin letter
 */
export declare const letterLatinLower: Parser<string>;
/**
 * parses a latin extended letter
 */
export declare const letterLatinExt: Parser<string>;
export declare const letterLatinExtUpper: Parser<any>;
export declare const letterLatinExtLower: Parser<any>;
/**
 * parses a digit
 */
export declare const digit: Parser<string>;
/**
 * parses a digit, except for 0
 */
export declare const digitNonzero: Parser<string>;
