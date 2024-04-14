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
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
	  "react/jsx-max-props-per-line": [1, { "maximum": { "single": 3, "multi": 1 } }],
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
			  'newlines-between': 'always',
			  alphabetize: {
				  order: 'asc',
				  caseInsensitive: true,
			  },
		  },
	  ],
  },
}
