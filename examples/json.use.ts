import { json } from './json'
import { inspect } from 'util'

// ----------------- USE CASE -----------------------------------
// --------------------------------------------------------------
console.log(
  inspect(
    json.run(`{
    "extends": [
      "standard-with-typescript",
      "prettier",
      "prettier/@typescript-eslint"
    ],
    "parserOptions": {
      "project": "./tsconfig.eslint.json"
    },
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
  }`),
    false,
    Infinity,
    true
  )
)

// --------------------------------------------------------------

console.log(
  inspect(
    json.run(`{
    "extends": [
      "standard-with-typescript",
      "prettier",
      "prettier/@typescript-eslint",
      [
        { "inception": "ception ception ception" },
        [ 1.0001, 2, 3, 4., 0.2,
          "json" ],
        [
          false,
          [],
          {},
          [{}],
          [true]
        ]
      ]
    ],
    "parserOptions": {
      "project": "./tsconfig.eslint.json"
    },
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
  }`),
    false,
    Infinity,
    true
  )
)
// --------------------------------------------------------------
