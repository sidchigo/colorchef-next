import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
		<footer className={`bg-purple-200 mt-auto`}>
			<div className="grid grid-cols-1 sm:grid-cols-2 p-3 md:p-4 lg:p-5 ">
				<section
					style={{ color: '#080374' }}
					className="flex text-xl md:text-3xl font-bold items-center justify-center md:justify-start"
				>
					<Link href="/">
						<a>Colorchef</a>
					</Link>
				</section>
				<section className="container">
					<div
						className="grid grid-cols-1 md:grid-cols-2"
						style={{ color: '#080374' }}
					>
						<div
							className={`flex flex-col ${styles.footerContent}`}
						>
							<Link href="/colors#">
								<a className={`${styles.footerLinks} my-3`}>
									Color generator
								</a>
							</Link>
							<Link href="/shadows">
								<a className={`${styles.footerLinks} my-3`}>
									Shadow generator
								</a>
							</Link>
							<Link href="/dark-palette">
								<a className={`${styles.footerLinks} my-3`}>
									Dark palettes
								</a>
							</Link>
						</div>
						<div
							className={`flex flex-col ${styles.footerContent}`}
						>
							<Link href="/Accessibility">
								<a className={`${styles.footerLinks} my-3`}>
									Accessibility options
								</a>
							</Link>
							<Link href="/Golden">
								<a className={`${styles.footerLinks} my-3`}>
									Golden ratio generator
								</a>
							</Link>
							<Link href="/about">
								<a className={`${styles.footerLinks} my-3`}>
									About
								</a>
							</Link>
						</div>
					</div>
				</section>
			</div>
			<div
				className={`bg-purple-300 text-center w-full py-2 px-3 md:px-4 lg:px-5 `}
				style={{ color: '#080374' }}
			>
				&copy; 2021 Colorchef • Made with ❤️ in India
			</div>
		</footer>
	);
}

export default Footer;