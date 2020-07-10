import { Parser } from '../parser';
/**
 * Matches the second of the given parsers between lowerBound and upperBound times, separated by the first of the given parsers
 * @param lowerBound A minimal number of matches
 * @param upperBound A maximal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export declare const separatedByBetween: <S>(lowerBound: number, upperBound: number) => (separator: Parser<S>, trailing?: 'always' | 'never' | 'optional') => <T>(parser: Parser<T>) => Parser<T[]>;
/**
 * Matches the second of the given parsers multiple times, separated by the first of the given parsers
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export declare const separatedBy: (separator: Parser<unknown>, trailing?: 'always' | 'never' | 'optional') => <T>(parser: Parser<T>) => Parser<T[]>;
/**
 * Matches the second of the given parsers at least lowerBound times, separated by the first of the given parsers
 * @param lowerBound A minimal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export declare const separatedByAtLeast: (lowerBound: number) => <S>(separator: Parser<S>, trailing: 'always' | 'never' | 'optional') => <T>(parser: Parser<T>) => Parser<T[]>;
/**
 * Matches the second of the given parsers at most upperBound times, separated by the first of the given parsers
 * @param upperBound A maximal number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export declare const separatedByAtMost: (upperBound: number) => <S>(separator: Parser<S>, trailing: 'always' | 'never' | 'optional') => <T>(parser: Parser<T>) => Parser<T[]>;
/**
 * Matches the second of the given parsers exactly the given number times, separated by the first of the given parsers
 * @param times An exact number of matches
 * @param separator parser to match separators
 * @param trailing optional parameter indicating wheter there should be trailing separators, defaults to 'never'
 * @param parser parser to match the results
 */
export declare const separatedByExactly: (times: number) => <S>(separator: Parser<S>, trailing: 'always' | 'never' | 'optional') => <T>(parser: Parser<T>) => Parser<T[]>;
