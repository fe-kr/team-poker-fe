module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
	  "plugin:react/recommended",
	  "plugin:prettier/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
  plugins: ['react-refresh', 'import', '@typescript-eslint'],
  rules: {
		'react/react-in-jsx-scope': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
	  'react/jsx-first-prop-new-line': [2, 'multiline'],
	  'react/jsx-max-props-per-line': [
		  2,
		  { maximum: 1, when: 'multiline' },
	  ],
	  'react/jsx-indent-props': [2, 2],
	  'react/jsx-closing-bracket-location': [
		  2,
		  'tag-aligned',
	  ],
	  'sort-imports': [
		  'error',
		  {
			  ignoreCase: false,
			  ignoreDeclarationSort: true,
			  ignoreMemberSort: false,
			  memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			  allowSeparatedGroups: true,
		  },
	  ],
	  'import/no-unresolved': 0,
	  'import/order': [
		  'error',
		  {
			  groups: [
				  'builtin',
				  'external',
				  'internal',
				  ['sibling', 'parent'],
				  'index',
				  'unknown',
			  ],
			  alphabetize: {
				  order: 'asc',
				  caseInsensitive: true,
			  },
		  },
	  ],
  },
	"settings": {
		"import/internal-regex": "(@components|@constants|@services|@hooks|@assets|@utils|@hocs)(/.+)?",
	}
}
