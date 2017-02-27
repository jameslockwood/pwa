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
    'strict': 'off',
    'object-curly-spacing' : 'off',
    'indent': ['error', 4],
    'react/jsx-filename-extension': ['error', {
        'extensions': ['.js', '.jsx']
    }],
    'react/jsx-curly-spacing': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
  'env': {
    'browser': true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'modules': true
    }
  },
  'parser': 'babel-eslint'
};
