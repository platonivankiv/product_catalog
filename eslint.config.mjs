import pluginJs from '@eslint/js'
import globals from 'globals'

export default {
  files: ['**/*.js'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: globals.browser,
  },
  ...pluginJs.configs.recommended,
  ignores: ['.idea/', 'dist/', 'node_modules/', '*.lock', 'cache/', '.vscode/'],
}
