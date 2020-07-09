# ParseRiver

A monadic parser library for TypeScript and JavaScript

# Get Started

Just run:

`npm install parseriver @types/parseriver`

# Your first parser

You can combine simple built-in parsers using a wide variety of built-in combinators and achieve powerful results with human readable code

    import {
      str,
      oneOf,
      separatedBy,
      surroundeByExtract,
    } from 'parseriver'

    const parser = surroundedByExtract(str('['), str(']'))(
      separatedBy(str(','))(
        oneOf(
          str('Yes'),
          str('No')
        )
      )
    )

    console.log(
      parser.run('[Yes,No,No,No,Yes]')
    )
