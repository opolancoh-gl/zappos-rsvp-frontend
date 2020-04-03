module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'arrow-parens': ['warn', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'function-paren-newline': 0,
    'operator-linebreak': ['warn', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'import/prefer-default-export': 0,
    'max-classes-per-file': ['warn', 4],
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'implicit-arrow-linebreak': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
