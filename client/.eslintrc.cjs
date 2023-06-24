module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // '@typescript-eslint/dot-notation' cần cái 'project nài
    project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.production.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  ignorePatterns: ['.eslintrc.cjs', 'vite-env.d.ts', 'tailwind.config.cjs', 'vite.config.ts', 'scripts/*'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
