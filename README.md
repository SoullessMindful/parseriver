# ParseRiver

A monadic parser library for TypeScript and JavaScript

# Get Started

Just run:

`npm install parseriver`

# Your first parser

You can combine simple built-in parsers using a wide variety of built-in combinators and achieve powerful results with human readable code.

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

# Say hi to *$do* notation

Now you don't need haskell to effectively and comfortably pipe parsers.

    import {
      $do,
      str,
      letters,
      whitespace,
      optionalWhitespace,
    } from 'parseriver'

    const parser = $do(function* () {
      yield optionalWhitespace
      yield str('I')
      yield whitespace
      yield str('am')
      yield whitespace

      const name = yield letters
      yield whitespace
      const surname = yield letters

      return { name, surname }
    })

    console.log(
      parser.run('   I   am  John         Galt')
    )

Can it get more human-readable?

# Use recursion for more power

JavaScript's eager evaluation makes it more difficult to build self-referential parsers. With *recursive* it's easier than ever.

    import {
      recursive,
      oneOf,
      str,
      decimalFloat,
      Parser,
    } from 'parseriver'

    const parser: Parser<number> = recursive(() => oneOf(
      decimalFloat,
      surroundedByExtract(str('('), str(')'))(parser)
    ))

    console.log(
      parser.run('(((-17.032)))')
    )
