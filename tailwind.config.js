const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				head: ['Poppins', ...defaultTheme.fontFamily.sans],
				body: ['Inter', ...defaultTheme.fontFamily.sans],
				logo: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
