export const Button = ({ variant, children, style, onClick }) => {
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

export const UpButton = ({
	variant,
	children,
	style,
	onClick,
	icon,
	hoverFill,
}) => {
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
};
