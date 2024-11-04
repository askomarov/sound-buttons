/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  singleQuote: true,
  quoteProps: 'consistent',
  semi: true,
  trailingComma: 'none',
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: 'always',
  singleAttributePerLine: false,
  bracketSameLine: false,
  bracketSameLine: false,
  printWidth: 80
}
