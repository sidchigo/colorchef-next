import { forwardRef } from "react";

const Button = ({ variant, children, style, onClick }) => {
	return (
		<button
			className={`${variant} px-4 py-2`}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const UpButton = forwardRef(({
	variant,
	children,
	style,
	onClick,
	icon,
	hoverFill,
}, ref) => {
	return (
		<button
			className={`
				relative group overflow-hidden 
				mt-6 bg-transparent transition duration-500 
				hover:text-white text-gray-900 
				border-2 border-gray-900 text-l px-6 py-4 
				${variant}
			`}
			style={style}
			onClick={onClick}
			ref={ref}
		>
			<span
				className={`
					absolute h-64 w-64 mt-16 top-0 left-0 
					${hoverFill} transition-all ease-out duration-500
					group-hover:-mt-20
				`}
			></span>
			<span className={`relative`}>
				{children} {icon}
			</span>
		</button>
	);
});

const Share = () => {
	// handleShare = () => {
	// 	// create a link of the card

	// 	// share the link of the card
	// }

	return (
		<button>
			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				fill="none" 
				viewBox="0 0 24 24" 
				strokeWidth="1.5" 
				stroke="currentColor" 
				className="h-6 w-6 hover:text-violet-600"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
			</svg>
		</button>
	)
}

UpButton.displayName = "UpButton";
Button.displayName = "Button";

export { Button, UpButton, Share };