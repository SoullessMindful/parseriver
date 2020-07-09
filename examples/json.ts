import {
  Parser,
  success,
  failure,
  anyChar,
  str,
  decimalFloat,
  optionalWhitespaceMultiline,
  oneOf,
  sequenceOf,
  surroundedByExtract,
  many,
  separatedBy,
  $do,
  recursive,
} from 'parseriver'

// A full JSON parser - for the use case see json.use.ts
export const json = recursive(() => oneOf(jsonArray, jsonObject))

// whole json array
const jsonArray: Parser<any[]> = $do(function* () {
  yield str('[')
  yield optionalWhitespaceMultiline

  const result = yield separatedBy(separator)(oneOf(primitiveValue, json))

  yield optionalWhitespaceMultiline
  yield str(']')

  return result
})

// whole json object
const jsonObject: Parser<object> = $do(function* () {
  yield str('{')
  yield optionalWhitespaceMultiline

  const result: Array<{ key: string; val: any }> = yield separatedBy(separator)(
    keyValPair
  )

  yield optionalWhitespaceMultiline
  yield str('}')

  const keys = result.map(({ key }) => key)
  if (keys.some((key, i) => keys.slice(i + 1).includes(key))) {
    yield failure('There are duplicate keys in the object literal')
  }

  return reconstructObject(result)
})

// UTILITY PARSERS AND FUNCTIONS

// single element of the string literal
const stringChar = oneOf(
  str('\\"').map(() => '"'), // escaping " with \"
  str('\\n').map(() => '\n'), // escaping newline with \n
  str('\\t').map(() => '\t'), // escaping tab with \t
  anyChar.bind((c) =>
    ['"', '\n', '\t'].includes(c)
      ? failure('Illegal character found in string literal')
      : success(c)
  )
)

// whole string literal
const stringLiteral = surroundedByExtract(
  str('"'),
  str('"')
)(many(stringChar).map((results) => results.join('')))

// boolean literal
const booleanLiteral = oneOf(str('true'), str('false')).map(
  (result) => result === 'true'
)

const primitiveValue = oneOf(stringLiteral, booleanLiteral, decimalFloat)

const separator = sequenceOf(
  optionalWhitespaceMultiline,
  str(','),
  optionalWhitespaceMultiline
)

const keyValPair = $do(function* () {
  const key = yield stringLiteral

  yield optionalWhitespaceMultiline
  yield str(':')
  yield optionalWhitespaceMultiline

  const val = yield oneOf(primitiveValue, json)

  return {
    key,
    val,
  }
})

const reconstructObject = (
  keyVals: Array<{ key: string; val: any }>
): object => {
  const result: any = {}
  keyVals.forEach(({ key, val }) => {
    result[key] = val
  })
  return result
}
