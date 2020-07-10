import { Parser } from '../parser';
/**
 * Allows to pipe parser with a syntax similar to async/await
 * @param generator The generator function in which body one can combine parsers
 * @returns The Parser that performs all operations combined
 */
export declare const $do: <R>(generator: () => Iterator<Parser<any>, R, any>) => Parser<R>;
