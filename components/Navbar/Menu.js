import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

import {Button} from 'components/Button';

const Menu = ({ open }) => {
    return (
		<div
			className={styles.sideMenu}
			style={{
				transform: open ? 'translateX(0)' : 'translateX(-100%)',
			}}
		>
			<Link href="/colors">
				<a>Colors</a>
			</Link>
			<Link href="/shadows">
				<a>Shadows</a>
			</Link>
			<Link href="/dark-palette">
				<a>Dark Palette</a>
			</Link>
			<Link href="/elements">
				<a>Elements</a>
			</Link>
			<Link href="/golden-ratio">
				<a>Golden Ratio</a>
			</Link>
			<Link href="/about">
				<a>About Us</a>
			</Link>
		</div>
	);
};

export default Menu;