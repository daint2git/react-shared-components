const prettierOptions = require('./.prettierrc');

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],

  plugins: ['react', 'prettier'],

  env: {
    browser: true,
    node: true,
    es2020: true,
  },

  rules: {
    'prettier/prettier': [2, prettierOptions],

    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],

    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.eslint.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['./.*.js', './configs/**/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
      },
    },
  ],
};
