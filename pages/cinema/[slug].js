import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'lib/firebase';
import Header from 'components/Header/Header';
import Meta from 'components/Meta';
import Save from 'components/Save';
import showToast from 'components/Toast';
import Link from "next/link";
import { fetchCinemaData, fetchMovieBySlug } from "lib/api";
const tinycolor = require("tinycolor2");

const MoviePage = ({ movie, slug }) => {
	const router = useRouter();
	const [user] = useAuthState(auth);

	const primaryTag = movie.tags[0] || "Cinematic";
	const pageTitle = `${movie.title} Color Palette: ${primaryTag} Aesthetic & Hex Codes`;

	const amazonLink = `https://www.amazon.com/gp/search?ie=UTF8&tag=colorchef-20&index=dvd&keywords=${encodeURIComponent(
		movie.title
	)}`;

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (!movie) {
		return (
			<div className="text-center p-8">
				<h1 className="text-2xl font-bold">Movie not found</h1>
			</div>
		);
	}

	const convertToHex = (color) => {
		try {
			return "#" + tinycolor(color).toHex().toUpperCase();
		} catch {
			return color;
		}
	};

	const copyColor = (color) => {
		const hexColor = convertToHex(color);
		navigator.clipboard.writeText(hexColor);
		showToast("Color copied!");
	};

	const copyPalette = () => {
		if (!movie.palette || movie.palette.length === 0) {
			showToast("No palette to copy");
			return;
		}

		let paletteCss = {};
		const colorNames = [
			"color-1",
			"color-2",
			"color-3",
			"color-4",
			"color-5",
		];

		movie.palette.forEach((color, index) => {
			const colorName = colorNames[index] || `color${index + 1}`;
			paletteCss[colorName] = convertToHex(color);
		});

		navigator.clipboard.writeText(JSON.stringify(paletteCss, null, 2));
		showToast("Palette copied!");
	};

	// Format palette data for Save component (as array of hex values)
	const paletteData = movie.palette
		? movie.palette.map((color) => convertToHex(color).substring(1))
		: [];

	const getStreamingOption = (movie) => {
		const isHorror = movie.tags.some((tag) => /horror|thriller/i.test(tag));
		const providers = movie.providers.map((p) => p.provider_name);

		if (isHorror && providers.includes("Shudder")) {
			return {
				label: "Stream on Shudder + MGM+",
				url: "https://www.amazon.com/gp/video/offers/signup/?tag=colorchef-20&benefitId=amzn1.dv.channel.0c14a07e-f7b1-8055-7c76-d1c19b4fc49c",
				color: "bg-gray-900 text-white border border-green-500 hover:bg-black",
			};
		}

		return {
			label: "Rent or Buy on Amazon",
			url: amazonLink,
			color: "bg-yellow-400 text-black",
		};
	};

	const streamOption = getStreamingOption(movie);

	return (
		<div>
			<Head>
				<title>{pageTitle} | ColorChef</title>
				<Meta
					title={`${movie.title} - Color Palette`}
					url={`/cinema/${slug}`}
					image={movie.backdrop_url}
					description={`Get the hex codes for ${movie.title}. A ${primaryTag} movie with a unique color palette suitable for designers and editors.`}
				/>
			</Head>
			<Header title={movie.title}>
				{movie.year} {primaryTag} Aesthetic • Color Palette & Hex Codes
			</Header>

			<div className="p-4 sm:mx-0 md:mx-16 lg:mx-32 xl:mx-64">
				{/* Aesthetic themes */}
				<div className="flex flex-wrap gap-2 mb-4 justify-center">
					{movie.tags.map((tag) => (
						<Link
							href={`/cinema?filter=${encodeURIComponent(tag)}`}
							key={tag}
						>
							<a className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-100 hover:bg-purple-100 hover:border-purple-300 transition-colors whitespace-nowrap">
								{tag}
								{/* This span is invisible to humans but visible to Google */}
								<span className="sr-only"> Aesthetic</span>
							</a>
						</Link>
					))}
				</div>

				{/* Backdrop Image */}
				{movie.backdrop_url && (
					<div className="mb-8 rounded-lg overflow-hidden shadow-lg">
						<img
							src={movie.backdrop_url}
							alt={`${movie.title} movie color palette and ${movie.tags[0]} aesthetic background`}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				)}

				{/* Color Palette */}
				<div className="mb-8">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold">Color Palette</h2>
						{movie.palette && movie.palette.length > 0 && (
							<div className="flex gap-4">
								{/* Copy Palette Icon */}
								<button
									className="p-2 rounded-lg transition-colors"
									onClick={copyPalette}
									title="Copy palette"
								>
									<svg
										className="h-6 w-6 text-gray-700 hover:text-purple-600"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="currentColor"
									>
										<path
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
								</button>

								{/* Save Palette Icon */}
								{user && <Save data={paletteData} />}
							</div>
						)}
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
						{movie.palette && movie.palette.length > 0 ? (
							movie.palette.map((color, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center gap-2"
								>
									<div
										className="w-full h-24 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
										style={{ backgroundColor: color }}
										title={`Click to copy ${convertToHex(
											color
										)}`}
										onClick={() => copyColor(color)}
									/>
									<span className="text-xs font-mono text-gray-600">
										{convertToHex(color)}
									</span>
								</div>
							))
						) : (
							<p className="text-gray-500">
								No palette data available
							</p>
						)}
					</div>
				</div>

				{/* Movie Info */}
				<div className="border-t pt-6 prose max-w-none mt-8">
					<h2 className="text-xl font-bold mb-4">
						About the {movie.title} Aesthetic
					</h2>
					<p className="text-gray-600">
						Explore the haunting visual identity of
						<strong>&nbsp;{movie.title}</strong>. This film helps
						define the <strong>{movie.tags.join(", ")}</strong>{" "}
						genre through its unique color grading. The palette
						features distinct tones like &nbsp;
						<span className="font-mono text-purple-600">
							{convertToHex(movie.palette[0])}
						</span>
						&nbsp;and&nbsp;
						<span className="font-mono text-purple-600">
							{convertToHex(movie.palette[1])}
						</span>
						, perfect for designers looking for&nbsp;
						{movie.tags[0]?.toLowerCase()} inspiration.
					</p>
				</div>

				<div className="mt-8">
					<a
						href={amazonLink}
						target="_blank"
						className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold shadow-md transition-transform ${streamOption.color}`}
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
							/>
						</svg>
						{streamOption.label}
					</a>

					{/* {movie.region !== "US" && (
						<p className="text-xs text-center mt-3 text-gray-400">
							Not available in your country?{" "}
							<a
								href="VPN_LINK"
								className="underline hover:text-purple-400"
							>
								Unlock via VPN
							</a>
							.
						</p>
					)} */}
				</div>

				<div className="flex flex-col gap-4 mt-10">
					{movie.providers && movie.providers.length > 0 && (
						<div className="flex items-center gap-3">
							<span className="text-xs text-gray-500 uppercase font-bold">
								Streaming on:
							</span>
							<div className="flex gap-3">
								{movie.providers.map((p) => (
									<img
										key={p.provider_name}
										src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
										alt={p.provider_name}
										className="w-8 h-8 rounded-md shadow-sm"
										title={p.provider_name}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export async function getStaticPaths() {
	try {
		const { movies } = await fetchCinemaData();

		// Generate paths for each movie
		const paths = Object.keys(movies).map((slug) => ({
			params: { slug },
		}));

		return {
			paths,
			fallback: "blocking", // Allow new movies to be added and generated on-demand
		};
	} catch (error) {
		console.error(
			"Error fetching cinema data for static generation:",
			error
		);
		// Return empty paths in case of error, use fallback for all routes
		return {
			paths: [],
			fallback: "blocking",
		};
	}
}

export async function getStaticProps({ params }) {
	try {
		const { slug } = params;
		const movie = await fetchMovieBySlug(slug);
		if (!movie) {
			return {
				notFound: true,
				revalidate: 60, // Revalidate every 60 seconds
			};
		}

		return {
			props: {
				movie,
				slug,
			},
			revalidate: process.env.NODE_ENV === "development" ? 1 : 3600, // Revalidate every hour
		};
	} catch (error) {
		console.error("Error fetching cinema data:", error);
		return {
			notFound: true,
			revalidate: 60,
		};
	}
}

export default MoviePage;
