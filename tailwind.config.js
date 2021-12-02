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
				logo: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				'fadein-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px)',
					},
					'70%': {
						opacity: '0.8',
						transform: 'translateX(10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
			animation: {
				'fadein-right': 'fadein-right 500ms ease-out',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
