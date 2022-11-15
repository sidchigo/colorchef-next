import React from "react"
import ContentLoader from "react-content-loader"

export const PulseCardLoader = (props) => (
	<ContentLoader 
		speed={2}
		width={250}
		height={300}
		viewBox="0 0 250 400"
		backgroundColor="#e9d5ff"
		foregroundColor="#d8b4fe"
		{...props}
	>
		<rect x="10" y="20" rx="0" ry="0" width="230" height="80" /> 
		<rect x="10" y="110" rx="0" ry="0" width="230" height="80" /> 
		<rect x="10" y="200" rx="0" ry="0" width="230" height="80" /> 
		<rect x="40" y="330" rx="0" ry="0" width="50" height="40" /> 
		<rect x="160" y="330" rx="0" ry="0" width="50" height="40" />
	</ContentLoader>
	
);