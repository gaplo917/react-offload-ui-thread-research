module.exports = {
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
  overrides: [
    {
      files: ['*.md'],
      options: {
        printWidth: 90,
        proseWrap: 'always',
      },
    },
  ],
}
