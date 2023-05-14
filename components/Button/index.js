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
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
            </svg>
        </button>
    );
};

UpButton.displayName = "UpButton";
Button.displayName = "Button";

export { Button, UpButton, Share };
