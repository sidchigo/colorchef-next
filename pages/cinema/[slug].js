import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "lib/firebase";
import Header from "components/Header/Header";
import Meta from "components/Meta";
import Save from "components/Save";
import showToast from "components/Toast";
import Link from "next/link";
import { fetchCinemaData, fetchMovieBySlug } from "lib/api";
const tinycolor = require("tinycolor2");

const MoviePage = ({ movie, slug }) => {
    const router = useRouter();
	const [user] = useAuthState(auth);

	if (router.isFallback)
		return (
			<div className="flex justify-center items-center h-screen">
				Loading...
			</div>
		);
	if (!movie)
		return (
			<div className="text-center p-8">
				<h1 className="text-2xl font-bold">Movie not found</h1>
			</div>
		);

	const primaryTag = movie.tags[0] || "Cinematic";
	const pageTitle = `${movie.title} Color Palette: ${primaryTag} Aesthetic & Hex Codes`;
	const amazonLink = `https://www.amazon.com/gp/search?ie=UTF8&tag=colorchef-20&index=dvd&keywords=${encodeURIComponent(
		movie.title
	)}`;

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
		showToast(`Hex code ${hexColor} copied!`);
	};

	const copyPalette = () => {
		if (!movie.palette?.length) return showToast("No palette to copy");
		const paletteCss = {};
		movie.palette.forEach((color, index) => {
			paletteCss[`color-${index + 1}`] = convertToHex(color);
		});
		navigator.clipboard.writeText(JSON.stringify(paletteCss, null, 2));
		showToast("JSON Palette copied!");
	};

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
		<div className="min-h-screen bg-white">
			<Head>
				<title>{pageTitle} | ColorChef</title>
				<Meta
					title={`${movie.title} - Color Palette`}
					url={`/cinema/${slug}`}
					image={movie.backdrop_url}
					description={`Get the hex codes for ${movie.title}. A ${primaryTag} movie with a unique color palette.`}
				/>
			</Head>

			<Header title={movie.title}>
				{movie.year} • {primaryTag} Aesthetic • Palette & Hex Codes
			</Header>

			{/* Responsive Container */}
			<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{/* Dynamic Tags */}
				<div className="flex flex-wrap gap-2 mb-6 justify-center">
					{movie.tags.map((tag) => (
						<Link
							href={`/cinema?filter=${tag
								.toLowerCase()
								.replace(/\s+/g, "-")}`}
							key={tag}
							className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-medium border border-purple-100 hover:bg-purple-100 transition-all active:scale-95"
						>
							{tag}
							<span className="sr-only"> Aesthetic</span>
						</Link>
					))}
				</div>

				{/* Hero Image Section */}
				{movie.backdrop_url && (
					<section className="mb-10 relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
						<Image
							src={movie.backdrop_url}
							alt={`${movie.title} palette background`}
							className="object-cover"
							fill
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
						/>
					</section>
				)}

				{/* Palette Section */}
				<section className="mb-12">
					<div className="flex justify-between items-end mb-6">
						<div>
							<h2 className="text-xl md:text-2xl font-bold text-gray-900">
								Color Palette
							</h2>
							<p className="text-xs text-gray-500 mt-1">
								Tap a color to copy hex code
							</p>
						</div>
						<div className="flex gap-2">
							<button
								className="p-2.5 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
								onClick={copyPalette}
								title="Copy JSON"
							>
								<svg
									className="h-5 w-5 text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							</button>
							{user && <Save data={paletteData} />}
						</div>
					</div>

					{/* Responsive Grid: 2 cols on mobile, 5 on desktop */}
					<div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-6">
						{movie.palette?.map((color, idx) => (
							<div
								key={idx}
								className="group flex flex-col items-center"
							>
								<button
									className="w-full aspect-square rounded-xl shadow-sm border border-black/5 cursor-pointer hover:scale-[1.02] transition-transform active:scale-95"
									style={{ backgroundColor: color }}
									onClick={() => copyColor(color)}
									aria-label={`Copy hex ${convertToHex(
										color
									)}`}
								/>
								<span className="mt-2 text-[10px] md:text-xs font-mono font-bold text-gray-500">
									{convertToHex(color)}
								</span>
							</div>
						))}
					</div>
				</section>

				{/* Content Section */}
				<article className="grid md:grid-cols-3 gap-8 border-t pt-10">
					<div className="md:col-span-2">
						<h2 className="text-lg md:text-xl font-bold mb-4 text-gray-900">
							About the {movie.title} Aesthetic
						</h2>
						<p className="text-sm md:text-base text-gray-600 leading-relaxed">
							Explore the haunting visual identity of{" "}
							<strong className="text-black">
								{movie.title}
							</strong>
							. This film defines the{" "}
							<span className="italic">
								{movie.tags.join(", ")}
							</span>{" "}
							genre through its unique color grading. Featuring
							tones like
							<span className="mx-1 px-1 bg-gray-100 rounded text-purple-600 font-mono">
								{convertToHex(movie.palette[0])}
							</span>
							and{" "}
							<span className="px-1 bg-gray-100 rounded text-purple-600 font-mono">
								{convertToHex(movie.palette[1])}
							</span>
							, it provides distinct inspiration for designers.
						</p>
					</div>

					{/* Sticky-ish CTA Area */}
					<aside className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
						<h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
							Watch Now
						</h3>
						<a
							href={amazonLink}
							target="_blank"
							rel="noreferrer"
							className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold shadow-lg transition-all hover:shadow-xl active:scale-95 ${streamOption.color}`}
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path d="M8 5v14l11-7z" />
							</svg>
							<span className="text-sm">
								{streamOption.label}
							</span>
						</a>

						{movie.providers?.length > 0 && (
							<div className="mt-8">
								<span className="text-[10px] text-gray-400 uppercase font-black block mb-3">
									Available on:
								</span>
								<div className="flex flex-wrap gap-2">
									{movie.providers.map((p) => (
										<Image
											key={p.provider_name}
											src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
											alt={p.provider_name}
											className="w-8 h-8 rounded-lg shadow-sm"
											title={p.provider_name}
											width={32}
											height={32}
										/>
									))}
								</div>
							</div>
						)}
					</aside>
				</article>
			</main>
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
