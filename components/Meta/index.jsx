const Meta = ({ title, url, image, description }) => {
	return (
		<>
			<meta property="og:title" content={title} />
			<meta
				property="og:url"
				content={`https://colorchef.vercel.app${url}`}
			/>
			<meta
				property="og:image"
				content={`https://colorchef.vercel.app${image}`}
			/>
			<meta property="og:type" content="website" />
			<meta property="og:description" content={description} />
		</>
	);
};

export default Meta;