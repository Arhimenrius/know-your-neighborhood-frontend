module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript',
    ],
    plugins: ['react', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
        '@typescript-eslint/indent': [2, 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/label-has-for': 0,
        'react/destructuring-assignment': 0,
        'max-len': ['error', { 'code': 120 }],

    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        settings: {
            'import/resolver': {
                node: { extensions: ['.js', '.mjs'] },
            },
        },
    },
};
