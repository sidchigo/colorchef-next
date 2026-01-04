import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

import Burger from "./Burger";
import { Auth } from "components/Auth";

// icons
import Logo from "icons/colorchef.svg";

// helpers
import useOutsideAlerter from "utility/OutsideClickHandler";
import { memo } from "react";

function Navbar() {
	const { ref, show, setShow } = useOutsideAlerter(false);
	const router = useRouter();

	return (
		<nav className="bg-white sticky top-0 w-full z-50 flex justify-center sm:justify-between items-center px-8 py-3 lg:py-3">
			<Link href="/" className="flex justify-self-center items-center">
				<img src={Logo.src} alt="Colorchef" />
			</Link>
			<div className="block lg:hidden" ref={ref}>
				<Burger open={show} setOpen={setShow} />
			</div>
			<div className="hidden lg:flex justify-end">
				<Link
					href="/colors"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/colors"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Colors
				</Link>
				<Link
					href="/shadows"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/shadows"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Shadows
				</Link>
				<Link
					href="/dark-palette"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/dark-palette"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Dark Palette
				</Link>
				<Link
					href="/buttons"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/buttons"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Buttons
				</Link>
				<Link
					href="/golden-ratio"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/golden-ratio"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Golden Ratio
				</Link>
				<Link
					href="/cinema"
					className={`
                        text-sm mx-2 hover:text-violet-600 
						flex justify-center align-middle
                        ${
							router.pathname === "/cinema"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					Cinema{" "}
					<span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold uppercase tracking-tighter">
						New
					</span>
				</Link>
				<Link
					href="/about"
					className={`
                        text-sm mx-2 hover:text-violet-600 
                        ${
							router.pathname === "/about"
								? "text-violet-600"
								: "text-gray-600"
						} 
                        ${styles.navLink}
                    `}
				>
					About
				</Link>
			</div>
			<div className={`hidden lg:block`}>
				<Auth />
			</div>
		</nav>
	);
}

export default memo(Navbar);
