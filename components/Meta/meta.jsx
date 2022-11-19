const Meta = ({ title, url, image, description }) => {
	return (
		<>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta name="google" content="nositelinkssearchbox" />
			<meta
				name="google-site-verification"
				content="3e0geQdLz85Lt7QW4uuffb3R-dx6IFCf8BbFJ9oLP6g"
			/>

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta
				property="og:url"
				content={`https://colorchef.vercel.app${url}`}
			/>
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta
				property="og:image"
				content={`https://colorchef.vercel.app${image}`}
			/>

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:url"
				content={`https://colorchef.vercel.app${url}`}
			/>
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta
				property="twitter:image"
				content={`https://colorchef.vercel.app${image}`}
			/>
		</>
	);
};

export { Meta };