import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

import Burger from './Burger';
import { Auth } from 'components/Auth';

// icons
import logo from 'icons/logo.svg';

// helpers
import useOutsideAlerter from 'utility/OutsideClickHandler';

function Navbar() {
	const { ref, show, setShow } = useOutsideAlerter(false);
	const router = useRouter();

	return (
		<nav className="bg-white sticky top-0 w-full z-50 flex justify-between items-center px-8 py-3 lg:py-3">
			<Link href="/">
				<a className="flex justify-self-center items-center">
					<img src={logo} width="150" height="150" alt="Colorchef" />
				</a>
			</Link>
			<div className="relative block lg:hidden" ref={ref}>
				<Burger open={show} setOpen={setShow} />
			</div>
			<div className="hidden lg:flex justify-end">
				<Link href="/colors">
					<a
						className={`
							text-sm mx-2 hover:text-violet-600 
							${router.pathname === '/colors' ? 'text-violet-600' : 'text-gray-600'} 
							${styles.navLink}
						`}
					>
						Colors
					</a>
				</Link>
				<Link href="/shadows">
					<a
						className={`
							text-sm mx-2 hover:text-violet-600 
							${router.pathname === '/shadows' ? 'text-violet-600' : 'text-gray-600'} 
							${styles.navLink}
						`}
					>
						Shadows
					</a>
				</Link>
				<Link href="/dark-palette">
					<a
						className={`
							text-sm mx-2 hover:text-violet-600 
							${router.pathname === '/dark-palette' ? 'text-violet-600' : 'text-gray-600'} 
							${styles.navLink}
						`}
					>
						Dark Palette
					</a>
				</Link>
				<Link href="/buttons">
					<a
						className={`
							text-sm mx-2 hover:text-violet-600 
							${router.pathname === '/buttons' ? 'text-violet-600' : 'text-gray-600'} 
							${styles.navLink}
						`}
					>
						Buttons
					</a>
				</Link>
				<Link href="/golden-ratio">
					<a
						className={`
							text-sm mx-2 hover:text-violet-600 
							${router.pathname === '/golden-ratio' ? 'text-violet-600' : 'text-gray-600'} 
							${styles.navLink}
						`}
					>
						Golden Ratio
					</a>
				</Link>
			</div>
			<div className={`hidden lg:block`}>
				<Auth />
			</div>
		</nav>
	);
}

export default Navbar;
