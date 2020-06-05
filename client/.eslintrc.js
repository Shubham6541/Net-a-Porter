module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 0,
    'Linebreak-style': 0,
    'max-len': 0,
    'comma-dangle': 1
  }
};
