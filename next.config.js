/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: false,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.tmdb.org",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
