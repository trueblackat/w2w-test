/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'no-shadow': [
      'error',
      {
        allow: ['state'],
      },
    ],
    'no-empty-pattern': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'Vue', 'acc', 'e'],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: 1,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/multi-word-component-names': 'off',
    'template-curly-spacing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
  },

  ignorePatterns: ['public/*'],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
