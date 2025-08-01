import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import babelParser from '@babel/eslint-parser';
import vueParser from 'vue-eslint-parser';

export default [
	js.configs.recommended,
	...vue.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				ecmaFeatures: {
					jsx: false
				}
			},
			globals: {
				uni: 'readonly',
				wx: 'readonly',
				getCurrentPages: 'readonly',
				getApp: 'readonly',
				plus: 'readonly',
				App: 'readonly',
				Page: 'readonly',
				Component: 'readonly',
				getRegExp: 'readonly',
				requirePlugin: 'readonly',
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				global: 'readonly',
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				uniCloud: 'readonly',
				weex: 'readonly'
			}
		},
		rules: {
			// Vue相关规则
			'vue/multi-word-component-names': 'off',
			'vue/no-unused-vars': 'warn',
			'vue/no-unused-components': 'warn',
			'vue/require-default-prop': 'off',
			'vue/require-prop-types': 'off',
			'vue/no-mutating-props': 'warn',
			'vue/no-v-html': 'off',
			'vue/component-name-in-template-casing': 'off',
			'vue/component-definition-name-casing': 'off',
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': 'off',
			'vue/html-indent': 'off',
			'vue/script-indent': 'off',
			'vue/require-explicit-emits': 'off',
			'vue/order-in-components': 'off',
			'vue/no-deprecated-model-definition': 'off',
			'vue/no-deprecated-v-on-native-modifier': 'off',
			'vue/valid-v-on': 'off',
			'vue/valid-v-else': 'off',
			'vue/no-side-effects-in-computed-properties': 'off',
			'vue/no-dupe-keys': 'warn',
			'vue/return-in-computed-property': 'warn',
			'vue/no-deprecated-delete-set': 'off',
			'vue/no-template-shadow': 'off',
			'vue/attributes-order': 'off',
			'vue/first-attribute-linebreak': 'off',
			'vue/html-closing-bracket-newline': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multiline-html-element-content-newline': 'off',
			'vue/v-on-event-hyphenation': 'off',
			
			// JavaScript基础规则
			'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
			'no-console': 'off',
			'no-debugger': 'error',
			'no-alert': 'warn',
			'no-var': 'error',
			'prefer-const': 'warn',
			'no-trailing-spaces': 'off',
			'indent': 'off',
			'quotes': 'off',
			'semi': 'off',
			'comma-dangle': 'off',
			'space-before-function-paren': 'off',
			'object-curly-spacing': 'off',
			'array-bracket-spacing': 'off',
			'brace-style': 'off',
			'comma-spacing': 'off',
			'key-spacing': 'off',
			'keyword-spacing': 'off',
			'space-infix-ops': 'off',
			'space-unary-ops': 'off',
			
			// 语法兼容性相关规则 - 检测可能导致运行时错误的现代语法
			'no-restricted-syntax': [
				'error',
				{
					selector: 'ChainExpression',
					message: '禁止使用可选链操作符 (?.)，在uni-app中可能导致"Unexpected token ."错误，请使用传统的 && 操作符'
				},
				{
					selector: 'LogicalExpression[operator="??"]',
					message: '禁止使用空值合并操作符 (??)，在uni-app中可能不被支持，请使用 || 操作符'
				}
			],
			
			// 代码质量规则
			'eqeqeq': 'warn',
			'no-duplicate-imports': 'off', // 关闭重复导入检查，因为uni-app使用条件编译
			'no-useless-return': 'warn',
			'no-multiple-empty-lines': 'off',
			'max-len': 'off',
			'no-lonely-if': 'off',
			'no-else-return': 'off',
			'no-empty-function': 'off',
			'no-implicit-coercion': 'off',
			'no-magic-numbers': 'off',
			'no-nested-ternary': 'warn',
			'no-unneeded-ternary': 'warn',
			'prefer-arrow-callback': 'off',
			'prefer-template': 'off',
			'yoda': 'off',
			'no-undef': 'warn',
			'no-dupe-keys': 'error',
			'no-unreachable': 'error',
			'no-empty': 'warn',
			'no-useless-escape': 'warn',
			'no-irregular-whitespace': 'warn'
		}
	},
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: babelParser,
				requireConfigFile: false,
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		}
	},
	{
		ignores: [
			'node_modules/',
			'dist/',
			'unpackage/',
			'uni_modules/',
			'*.min.js',
			'*.map',
			'.DS_Store',
			'.git/',
			'.vscode/',
			'.idea/',
			'*.log'
		]
	}
]; 