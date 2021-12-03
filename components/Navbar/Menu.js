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
			<Link href="/services">
				<div className={styles.navLink}>Services</div>
			</Link>
			<Link href="/solutions">
				<div className={styles.navLink}>Solutions</div>
			</Link>
			<Link href="/works">
				<div className={styles.navLink}>Works</div>
			</Link>
			<Link href="/insights">
				<div className={styles.navLink}>Insights</div>
			</Link>
			<Link href="/about">
				<div className={styles.navLink}>About</div>
			</Link>
			<Link href="/contact">
				<div>
					<Button>Contact us</Button>
				</div>
			</Link>
		</div>
	);
};

export default Menu;