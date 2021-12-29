const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
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
				'fadein-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(100px)',
					},
					'70%': {
						opacity: '0.8',
						transform: 'translateX(-10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'bounce-linear': {
					'0%, 100%': {
						transform: 'translateX(25%)',
						animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
					},
					'50%': {
						transform: 'none',
						animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
					},
				},
			},
			animation: {
				'fadein-right': 'fadein-right 500ms ease-out',
				'fadein-left': 'fadein-left 500ms ease-out',
				'bounce-linear': 'bounce-linear 2s infinite',
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none',
				},
				'.no-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
				},
			});
		}),
	],
};
