module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier/react'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'curly': ['error', 'all'],
        'react/jsx-filename-extension': [
            'warn',
            {
                'extensions': ['.jsx', '.js'],
            },
        ],
        'quotes': [
            'error',
            'single',
            { 'avoidEscape': true, 'allowTemplateLiterals': false }
        ],
        'max-len': ['error', {'code': 80, 'ignoreUrls': true}],
        'import/prefer-default-export': 'off',
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'no-param-reassign': 'off',
        'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
        'arrow-parens': 'off',
        'implicit-arrow-linebreak': 'off',
        'operator-linebreak': ['error', 'after'],
        'comma-dangle': [
            'error',
            {
                'arrays': 'only-multiline',
                'objects': 'only-multiline',
                'imports': 'only-multiline',
                'exports': 'only-multiline',
                'functions': 'never',
            },
        ],
    },
};
