// 采用umi严格eslint检查(umi已集成airbnb，以及其他react规则)
// jsx-a11y: https://cnpmjs.org/package/eslint-plugin-jsx-a11y
// eslint-plugin-react: https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'react/jsx-indent': ['error', 2],
    'react/jsx-key': 'error',
    'import/extensions': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/alt-text': 'off',
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 'off',
    'no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
  }
};
