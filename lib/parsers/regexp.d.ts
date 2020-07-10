import { Parser } from '../parser';
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
