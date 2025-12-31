export const DATA_HOST = process.env.DATA_HOST || "http://localhost:5000/v1/admin/cinema";
const IS_DEV = process.env.NODE_ENV === "development";

export async function fetchCinemaData() {
	try {
		const [indexRes, configRes] = await Promise.all([
			fetch(`${DATA_HOST}/${IS_DEV ? "index" : "index.json"}`),
			fetch(`${DATA_HOST}/${IS_DEV ? "config" : "config.json"}`),
		]);

		if (!indexRes.ok) throw new Error("Failed to fetch index");
		if (!configRes.ok) throw new Error("Failed to fetch config");

		const movies = await indexRes.json();
		const config = await configRes.json();

		const normalizedMovies = Array.isArray(movies)
			? movies
			: Object.entries(movies).map(([slug, data]) => ({ slug, ...data }));

		return {
			movies: normalizedMovies,
			config,
		};
	} catch (error) {
		console.error("Data Fetch Error:", error);
		return { movies: [], config: { curated_filters: [] } };
	}
}

export async function fetchMovieBySlug(slug) {
	try {
		const url = `${DATA_HOST}/${IS_DEV ? slug : `/movies/${slug}.json`}`;
		const res = await fetch(url);
		if (!res.ok) return null;
		return await res.json();
	} catch (error) {
		console.error(`Error fetching movie ${slug}:`, error);
		return null;
	}
}
