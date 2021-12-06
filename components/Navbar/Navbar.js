import { useRef, useState } from 'react';

import Link from 'next/link';
import styles from './Navbar.module.css';

// components
import {Button} from 'components/Button';
import Burger from './Burger';

// helpers
import useOutsideAlerter from 'utility/OutsideClickHandler';
import logo from 'icons/logo.svg';

function Navbar() {
	const { ref, show, setShow } = useOutsideAlerter(false);

	return (
		<nav className="bg-white fixed top-0 w-full z-50 flex justify-center md:justify-between items-center px-8 py-2">
			<div className="block lg:hidden" ref={ref}>
				<Burger open={show} setOpen={setShow} />
			</div>
			<Link href="/">
				<a className="flex items-center">
					<img src={logo} width="45" height="45" alt="Colorchef" />
					<span className={`font-logo text-3xl`}>Colorchef</span>
				</a>
			</Link>
			<div className="hidden md:flex w-2/4 justify-end">
				<Link href="/colors">
					<a className={styles.navLink}>Colors</a>
				</Link>
				<Link href="/shadows">
					<a className={styles.navLink}>Shadows</a>
				</Link>
				<Link href="/dark-palette">
					<a className={styles.navLink}>Dark Palette</a>
				</Link>
				<Link href="/buttons">
					<a className={styles.navLink}>Buttons</a>
				</Link>
				<Link href="/golden-ratio">
					<a className={styles.navLink}>Golden Ratio</a>
				</Link>
				<Link href="/about">
					<a className={styles.navLink}>About Us</a>
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
