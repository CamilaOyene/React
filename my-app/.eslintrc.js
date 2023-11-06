module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-restricted-exports': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-vars': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
