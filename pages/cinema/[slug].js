import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'lib/firebase';
import Header from 'components/Header/Header';
import Meta from 'components/Meta';
import Save from 'components/Save';
import showToast from 'components/Toast';
const tinycolor = require('tinycolor2');

const MoviePage = ({ movie, slug }) => {
	const router = useRouter();
	const [user] = useAuthState(auth);

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
			return '#' + tinycolor(color).toHex().toUpperCase();
		} catch {
			return color;
		}
	};

	const copyColor = (color) => {
		const hexColor = convertToHex(color);
		navigator.clipboard.writeText(hexColor);
		showToast('Color copied!');
	};

	const copyPalette = () => {
		if (!movie.palette || movie.palette.length === 0) {
			showToast('No palette to copy');
			return;
		}

		let paletteCss = {};
		const colorNames = ['primary', 'secondary', 'accent', 'accent2', 'accent3'];

		movie.palette.forEach((color, index) => {
			const colorName = colorNames[index] || `color${index + 1}`;
			paletteCss[colorName] = convertToHex(color);
		});

		navigator.clipboard.writeText(JSON.stringify(paletteCss, null, 2));
		showToast('Palette copied!');
	};

	// Format palette data for Save component (as array of hex values)
	const paletteData = movie.palette
		? movie.palette.map(color => convertToHex(color).substring(1))
		: [];

	return (
		<div>
			<Head>
				<title>{movie.title} | ColorChef Cinema</title>
				<Meta
					title={`${movie.title} - Color Palette`}
					url={`/cinema/${slug}`}
					image={movie.backdrop_url}
					description={`Explore the color palette from ${movie.title}`}
				/>
			</Head>
			<Header title={movie.title}>
				Discover the color palette from this movie
			</Header>

			<div className="p-4 sm:mx-0 md:mx-16 lg:mx-32 xl:mx-64">
				{/* Backdrop Image */}
				{movie.backdrop_url && (
					<div className="mb-8 rounded-lg overflow-hidden shadow-lg">
						<img
							src={movie.backdrop_url}
							alt={movie.title}
							className="w-full h-80 object-cover"
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
								{user && (
									<Save data={paletteData} />
								)}
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
										title={`Click to copy ${convertToHex(color)}`}
										onClick={() => copyColor(color)}
									/>
									<span className="text-xs font-mono text-gray-600">
										{convertToHex(color)}
									</span>
								</div>
							))
						) : (
							<p className="text-gray-500">No palette data available</p>
						)}
					</div>
				</div>

				{/* Movie Info */}
				<div className="border-t pt-6">
					<h3 className="text-lg font-bold mb-2">Movie Information</h3>
					<p className="text-gray-700">
						<strong>Movie theme:</strong> {movie.tags.join(", ")}
					</p>
					<p className="text-gray-700">
						<strong>TMDB ID:</strong> {movie.tmdb_id}
					</p>
				</div>
			</div>
		</div>
	);
};

export async function getStaticPaths() {
	try {
		// Fetch cinema_data.json from your backend
		const response = await fetch('http://localhost:5000/v1/admin/cinema/data');
		const cinemaData = await response.json();

		// Generate paths for each movie
		const paths = Object.keys(cinemaData).map((slug) => ({
			params: { slug },
		}));

		return {
			paths,
			fallback: 'blocking', // Allow new movies to be added and generated on-demand
		};
	} catch (error) {
		console.error('Error fetching cinema data for static generation:', error);
		// Return empty paths in case of error, use fallback for all routes
		return {
			paths: [],
			fallback: 'blocking',
		};
	}
}

export async function getStaticProps({ params }) {
	try {
		const { slug } = params;

		// Fetch cinema_data.json from your backend
		const response = await fetch('http://localhost:5000/v1/admin/cinema/data');
		const cinemaData = await response.json();

		const movie = cinemaData[slug];

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
			revalidate: 3600, // Revalidate every hour
		};
	} catch (error) {
		console.error('Error fetching cinema data:', error);
		return {
			notFound: true,
			revalidate: 60,
		};
	}
}

export default MoviePage;
