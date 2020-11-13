module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
		es6: true,
	},
	extends: [
		"airbnb-base",
	],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: "off",
		quotes: [ "error", "double" ],
		semi: [ "error", "always" ],
		"array-bracket-spacing": [ "error", "always" ],
		"object-curly-spacing": [ "error", "always" ],
		"space-in-parens": [ "error", "always" ],
		"linebreak-style": 0,
		"no-tabs": 0,
	},
};
