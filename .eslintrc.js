module.exports = {
    extends: ['airbnb'],
    rules: {
        'semi': 'off',
        'no-multiple-empty-lines': 'off',
        'padded-blocks': 'off',
        'no-trailing-spaces': 'off',
        'space-before-function-paren': 'off',
        'no-unused-vars': 'warn',
        'comma-dangle': ['error', 'never'],
        'import/prefer-default-export': 'off',
        'strict': 'off',
        'object-curly-spacing': 'off',
        'indent': ['error', 4],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx']
            }
        ],
        'react/jsx-curly-spacing': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/sort-comp': 'off',
        'jsx-a11y/no-static-element-interactions': 'off'
    },
    globals: {
        '$Keys': true
    },
    env: {
        'browser': true
    },
    parserOptions: {
        'allowImportExportEverywhere': true,
        'ecmaFeatures': {
            jsx: true,
            modules: true
        }
    },
    parser: 'babel-eslint',
    // These settings are needed for eslint to play well with webpack resolve
    settings: {
        'import/resolver': {
            webpack: { config: 'webpack.config.base.js' }
        }
    }
};
