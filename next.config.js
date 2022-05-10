const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
	images: {
		disableStaticImages: true,
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
};

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				handleImages: ['png', 'svg'],
				inlineImageLimit: -1,
				optimizeImagesInDev: true,
				optipng: {
					optimizationLevel: 7,
				},
			},
		]
	],
	nextConfig
);