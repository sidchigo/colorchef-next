import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Auth } from "components/Auth";

const Menu = ({ open, setOpen }) => {
	const router = useRouter();

	return (
		<div
			className={`
				flex flex-col justify-end
				bg-white h-full w-full
				fixed top-0 right-0 px-12 pb-16
				-z-10 items-center transition
				text-xl
			`}
			style={{
				transform: open ? "translateX(0)" : "translateX(100%)",
			}}
		>
			<Link
				href="/colors"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/colors"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Colors
			</Link>
			<Link
				href="/shadows"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/shadows"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Shadows
			</Link>
			<Link
				href="/dark-palette"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/dark-palette"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Dark Palette
			</Link>
			<Link
				href="/buttons"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/buttons"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Buttons
			</Link>
			<Link
				href="/golden-ratio"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/golden-ratio"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Golden Ratio
			</Link>
			<Link
				href="/cinema"
				onClick={() => setOpen(false)}
				className={`${
					router.pathname === "/cinema"
						? "text-violet-600"
						: "text-gray-600"
				} m-4
                `}
			>
				Cinema
				<sup className="bg-red-600 align-super text-white text-[8px] px-1.5 py-1 rounded ml-1 font-bold uppercase tracking-tighter">
					New
				</sup>
			</Link>
			<div className={`m-4`}>
				<Auth extraFunction={() => setOpen(false)} />
			</div>
		</div>
	);
};

export default Menu;
