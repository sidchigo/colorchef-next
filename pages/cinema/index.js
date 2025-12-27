import Head from 'next/head';
import { useState, useMemo } from 'react';
import Header from 'components/Header/Header';
import Meta from 'components/Meta';
const tinycolor = require('tinycolor2');

const CinemaIndex = ({ movies, allTags }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);

	// Filter movies by search query and selected tags
	const filteredMovies = useMemo(() => {
		return movies.filter((movie) => {
			const matchesSearch = movie.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

			const matchesTags =
				selectedTags.length === 0 ||
				(movie.tags &&
					selectedTags.some((tag) =>
						movie.tags
							.map((t) => t.trim().toLowerCase())
							.includes(tag.toLowerCase())
					));
			return matchesSearch && matchesTags;
		});
	}, [searchQuery, selectedTags, movies]);

	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const convertToHex = (color) => {
		try {
			return "#" + tinycolor(color).toHex().toUpperCase();
		} catch {
			return color;
		}
	};

	return (
		<div>
			<Head>
				<title>
					Cinema Color Palettes: Asian Horror & Anime Aesthetic
					Discovery
				</title>
				<Meta
					title="Cinema Color Palettes: Asian Horror & Anime Aesthetic Discovery"
					url="/cinema"
					description="Discover the color palettes extracted from iconic cinema. Filter by movie theme and explore aesthetic color combinations inspired by films."
				/>
			</Head>

			<Header title="Cinema Color Palettes">
				Discover color palettes extracted from iconic cinema. Filter by
				movie theme and explore aesthetic color combinations.
			</Header>

			<div className="p-4 sm:mx-0 md:mx-8 lg:mx-16">
				{/* Search Bar */}
				<div className="mb-8">
					<input
						type="text"
						placeholder="Search by movie title..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
					/>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Niche Tags Filter Sidebar */}
					<div className="lg:w-48 flex-shrink-0">
						<div className="sticky top-4">
							<h3 className="text-lg font-bold mb-4">
								Filter by Theme
							</h3>
							<div className="space-y-2 bg-gray-50 p-4 rounded-lg">
								{allTags.length > 0 ? (
									allTags.map((tag) => (
										<label
											key={tag}
											className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition"
										>
											<input
												type="checkbox"
												checked={selectedTags.includes(
													tag
												)}
												onChange={() => toggleTag(tag)}
												className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
											/>
											<span className="text-sm text-gray-700">
												{tag}
											</span>
										</label>
									))
								) : (
									<p className="text-sm text-gray-500">
										No themes available
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Movie Grid */}
					<div className="flex-1">
						{filteredMovies.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{filteredMovies.map((movie) => (
									<a
										key={movie.slug}
										href={`/cinema/${movie.slug}`}
										className="group cursor-pointer"
									>
										<div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100">
											{/* Movie Backdrop */}
											<div className="relative h-48 w-full bg-gray-200 overflow-hidden">
												{movie.backdrop_url ? (
													<img
														src={movie.backdrop_url}
														alt={movie.title}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
														<span className="text-gray-500 text-sm">
															No image
														</span>
													</div>
												)}
											</div>

											{/* Color Palette Bar */}
											<div className="flex h-12 gap-1 p-2 bg-gray-50">
												{movie.palette &&
												movie.palette.length > 0 ? (
													movie.palette
														.slice(0, 5)
														.map((color, idx) => (
															<div
																key={idx}
																className="flex-1 rounded transition-all duration-300 hover:scale-110 hover:shadow-md"
																style={{
																	backgroundColor:
																		color,
																}}
																title={convertToHex(
																	color
																)}
															/>
														))
												) : (
													<div className="w-full bg-gray-300 rounded" />
												)}
											</div>

											{/* Movie Title */}
											<div className="p-4 bg-white h-[60px]">
												<h3 className="font-bold text-sm text-gray-800 group-hover:text-purple-600 transition line-clamp-1 overflow-hidden">
													{movie.title}
												</h3>
											</div>
										</div>
									</a>
								))}
							</div>
						) : (
							<div className="flex justify-center items-center py-16">
								<div className="text-center">
									<p className="text-gray-500 text-lg mb-2">
										No movies found
									</p>
									<p className="text-gray-400 text-sm">
										Try adjusting your search or filters
									</p>
								</div>
							</div>
						)}

						{/* Results Count */}
						<div className="mt-8 text-center text-gray-600">
							<p className="text-sm">
								Showing {filteredMovies.length} of{" "}
								{movies.length} movies
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	try {
		const response = await fetch(
			"http://localhost:5000/v1/admin/cinema/index"
		);
		const cinemaData = await response.json();

		// Convert cinema_data object to array with slug
		const movies = Object.entries(cinemaData).map(([slug, data]) => ({
			slug,
			...data,
		}));

		// Extract unique tags
		const allTagsSet = new Set();
		movies.forEach((movie) => {
			try {
				if (movie?.tags.length) {
					const tags = movie.tags
						.map((t) => t.trim())
						.filter((t) => t);
					tags.forEach((tag) => allTagsSet.add(tag));
				}
			} catch (e) {
				console.log({ e, tags: movie.tags });
			}
		});

		const allTags = Array.from(allTagsSet).sort();

		return {
			props: {
				movies,
				allTags,
			},
			revalidate: 86400, // Revalidate every 24 hr
		};
	} catch (error) {
		console.error("Error fetching cinema data:", error);
		return {
			props: {
				movies: [],
				allTags: [],
			},
			revalidate: 60,
		};
	}
}

export default CinemaIndex;