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
						Colorchef
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
							<Link href="/colors" className={`${styles.footerLinks} my-3`}>
								Color generator
							</Link>
							<Link href="/shadows" className={`${styles.footerLinks} my-3`}>
								Shadow generator
							</Link>
							<Link href="/dark-palette" className={`${styles.footerLinks} my-3`}>
								Dark palettes
							</Link>
						</div>
						<div
							className={`flex flex-col ${styles.footerContent}`}
						>
							<Link href="/buttons" className={`${styles.footerLinks} my-3`}>
								Buttons generator
							</Link>
							<Link href="/golden-ratio" className={`${styles.footerLinks} my-3`}>
								
								Golden ratio generator
								
							</Link>
							<Link href="/about" className={`${styles.footerLinks} my-3`}>
								About
							</Link>
						</div>
					</div>
				</section>
			</div>
            <div
				className={`bg-purple-300 text-center w-full py-2 px-3 md:px-4 lg:px-5 `}
				style={{ color: '#080374' }}
			>
				&copy; 2021 - {new Date().getFullYear()} Colorchef • Made with
				❤️ in India
			</div>
        </footer>
    );
}

export default Footer;