import { forwardRef } from 'react';

const Button = ({ variant, children, style, onClick }) => {
	return (
		<button
			className={`${variant} px-2 py-4 rounded-lg`}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const SimpleButton = ({ variant, children, style, onClick }) => {
	return (
		<button
			className={`${variant} px-2 py-4`}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const UpButton = forwardRef(
	({ variant, children, style, onClick, icon, hoverFill }, ref) => {
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
	}
);

UpButton.displayName = 'UpButton';
Button.displayName = 'Button';

export { Button, UpButton, SimpleButton };