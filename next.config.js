/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
