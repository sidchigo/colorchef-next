import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Header from "components/Header/Header";
import Meta from "components/Meta";
const tinycolor = require("tinycolor2");
import { fetchCinemaData } from "lib/api";

const CinemaIndex = ({ movies, filters }) => {
	const router = useRouter();
	const { filter: filterQuery, search: searchQuery = "" } = router.query;
	const [localSearch, setLocalSearch] = useState(() => {
		if (typeof window === "undefined") return "";

		const params = new URLSearchParams(window.location.search);
		const searchParam = params.get("search") || "";
		return searchParam.replace(/-/g, " ");
	});

	useEffect(() => {
		if (!router.isReady) return;
		const urlSearch = router.query.search || "";
		if (localSearch === urlSearch) return;

		const timer = setTimeout(() => {
			const newQuery = { ...router.query };

			if (localSearch) {
				newQuery.search = localSearch
					.toLowerCase()
					.trim()
					.replace(/\s+/g, "-");
			} else {
				delete newQuery.search;
			}

			router.push(
				{
					pathname: router.pathname,
					query: newQuery,
				},
				undefined,
				{ shallow: true }
			);
		}, 400);

		return () => clearTimeout(timer);
	}, [localSearch, router]);

	const selectedTags = useMemo(() => {
		if (!filterQuery) return ["All"];

		const slugs = (
			Array.isArray(filterQuery) ? filterQuery[0] : filterQuery
		).split(",");

		return slugs.map((slug) => {
			// Find the original filter name (e.g., "Folk Horror") that matches the slug "folk-horror"
			return (
				filters.find(
					(f) => f.toLowerCase().replace(/\s+/g, "-") === slug
				) || slug
			);
		});
	}, [filterQuery, filters]);

	const toggleTag = (tag) => {
		const current = selectedTags.filter((t) => t !== "All");
		let next;

		if (tag === "All") {
			next = ["All"];
		} else {
			next = current.includes(tag)
				? current.filter((t) => t !== tag)
				: [...current, tag];
		}

		if (next.length === 0) next = ["All"];

		// Convert ["Folk Horror"] to "folk-horror" for the URL
		const filterParam = next
			.map((t) => t.toLowerCase().replace(/\s+/g, "-"))
			.join(",");

		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, filter: filterParam },
			},
			undefined,
			{ shallow: true }
		);
	};

	const filteredMovies = useMemo(() => {
		return movies.filter((movie) => {
			const query = searchQuery
				.toString()
				.toLowerCase()
				.replace(/-/g, " ");

			const matchesSearch =
				!query ||
				movie.title.toLowerCase().includes(query) ||
				movie.raw_keywords?.some((k) =>
					k.toLowerCase().includes(query)
				) ||
				movie.tags?.some((t) => t.toLowerCase().includes(query));

			const matchesFilter =
				selectedTags.includes("All") ||
				(movie.tags &&
					selectedTags.some((tag) =>
						movie.tags
							.map((t) => t.trim().toLowerCase())
							.includes(tag.toLowerCase())
					));

			return matchesSearch && matchesFilter;
		});
	}, [searchQuery, selectedTags, movies]);

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
				<title>Cinema Color Palettes | Colorchef</title>
				<Meta
					title="Cinema Color Palettes: Asian Horror & Anime Aesthetic Discovery"
					url="/cinema"
					description="Discover color palettes extracted from iconic cinema. Filter by movie theme and aesthetic."
				/>
			</Head>

			<Header title="Cinema Color Palettes">
				Discover color palettes extracted from iconic cinema.
			</Header>

			<div className="p-4 sm:mx-0 md:mx-8 lg:mx-16">
				<div className="mb-8">
					<input
						type="text"
						placeholder="Search movies, themes, or vibes..."
						value={localSearch}
						onChange={(e) => setLocalSearch(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
					/>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-48 flex-shrink-0">
						<div className="sticky top-4">
							<h3 className="text-lg font-bold mb-4">
								Filter by Theme
							</h3>
							<div className="space-y-2 bg-gray-50 p-4 rounded-lg">
								{filters.map((tag) => (
									<label
										key={tag}
										className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition"
									>
										<input
											type="checkbox"
											checked={selectedTags.includes(tag)}
											onChange={() => toggleTag(tag)}
											className="w-4 h-4 text-purple-600 rounded"
										/>
										<span className="text-sm text-gray-700">
											{tag}
										</span>
									</label>
								))}
							</div>
						</div>
					</div>

					<div className="flex-1">
						{filteredMovies.length > 0 ? (
							<div className="mb-4 text-gray-600">
								Showing {filteredMovies.length} of {movies.length} movies.
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{filteredMovies.map((movie) => (
									<a
										key={movie.slug}
										href={`/cinema/${movie.slug}`}
										className="group"
									>
										<div className="rounded-lg overflow-hidden shadow-lg bg-gray-100">
											<div className="relative h-48 w-full bg-gray-200">
												{movie.backdrop_url && (
													<Image
														src={movie.backdrop_url}
														alt={movie.title}
														width={300}
														height={200}
														unoptimized // Use unoptimized for crispness as we discussed
														className="w-full h-full object-cover group-hover:scale-105 transition-transform"
													/>
												)}
											</div>
											<div className="flex h-12 gap-1 p-2 bg-gray-50">
												{movie.palette
													?.slice(0, 5)
													.map((color, idx) => (
														<div
															key={idx}
															className="flex-1 rounded"
															style={{
																backgroundColor:
																	color,
															}}
															title={convertToHex(
																color
															)}
														/>
													))}
											</div>
											<div className="p-4 bg-white">
												<h3 className="font-bold text-sm text-gray-800 line-clamp-1">
													{movie.title}
												</h3>
											</div>
										</div>
									</a>
								))}
							</div>
						) : (
							<div className="text-center py-16 text-gray-500">
								No movies found.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps() {
	try {
		const { movies, config } = await fetchCinemaData();
		return {
			props: {
				movies,
				filters: config.curated_filters || ["All"],
			},
			revalidate: 3600,
		};
	} catch (error) {
		return { props: { movies: [], filters: [] }, revalidate: 60 };
	}
}

export default CinemaIndex;
