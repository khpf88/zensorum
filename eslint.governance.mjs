import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'import': importPlugin,
    },
    rules: {
      'no-restricted-globals': ['error', 'Date', 'Math.random', 'setTimeout', 'setInterval'],
      'no-restricted-properties': [
        'error',
        { object: 'process', property: 'exit', message: 'Use explicit return codes.' },
        { object: 'console', property: 'log', message: 'Use explicit deterministic logging.' }
      ],
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            { target: 'packages/contracts', from: 'packages/canonical' },
            { target: 'packages/contracts', from: 'packages/replay' },
            { target: 'packages/canonical', from: 'packages/replay' }
          ]
        }
      ]
    }
  }
];
