//const flatCompat = require('@eslint/eslintrc').FlatCompat();
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

//ESM import
//const reactPlugin = require('eslint-config-react-app').

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});


export default [
  ...compat.extends("react-app"),
  //...compat.plugins("react-app", "@babel/plugin-transform-private-property-in-object")
]
