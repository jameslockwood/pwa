module.exports = {
  'extends': ['airbnb'],
  'rules': {
    'semi': 'off',
    'no-multiple-empty-lines': 'off',
    'padded-blocks': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'warn',
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': ['error', {
      'extensions': ['.js', '.jsx']
    }]
  },
  'env': {
    'browser': true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true
    }
  }
};
