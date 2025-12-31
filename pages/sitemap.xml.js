import { fetchCinemaData } from "lib/api";

const BASE_URL = "https://colorchef.vercel.app";

function generateSiteMap(movies, filters) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${BASE_URL}/colors</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/shadows</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/golden-ratio</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/dark-palette</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/buttons</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/about</loc>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${BASE_URL}/cinema</loc>
       <priority>0.9</priority>
     </url>

     ${movies
			.map(({ slug, updatedAt }) => {
				return `
       <url>
           <loc>${`${BASE_URL}/cinema/${slug}`}</loc>
           <lastmod>${updatedAt || new Date().toISOString()}</lastmod>
           <priority>0.8</priority>
       </url>
     `;
			})
			.join("")}

     ${filters
			.map((tag) => {
				const filterSlug = tag.toLowerCase().replace(/\s+/g, "-");
				return `
       <url>
           <loc>${`${BASE_URL}/cinema?filter=${filterSlug}`}</loc>
           <priority>0.6</priority>
       </url>
     `;
			})
			.join("")}
   </urlset>
 `;
}

function SiteMap() {
	return null;
}

export async function getServerSideProps({ res }) {
	try {
		const { movies, config } = await fetchCinemaData();
		const filters = config?.curated_filters || [];

		const sitemap = generateSiteMap(movies, filters);

		res.setHeader("Content-Type", "text/xml");
		res.setHeader(
			"Cache-Control",
			"public, s-maxage=3600, stale-while-revalidate=59"
		);
		res.write(sitemap);
		res.end();

		return {
			props: {},
		};
	} catch (error) {
		console.error("Sitemap generation error:", error);
		res.statusCode = 500;
		res.end();
		return { props: {} };
	}
}

export default SiteMap;
