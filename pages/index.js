import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/utils.module.css';

// icons
import Pancake from 'icons/pancake.svg';
import Juice from 'icons/juice.svg';
import Melon from 'icons/melon.svg';
import Pastry from 'icons/pastry.svg';
import Icecream from 'icons/icecream.svg';
import hero from 'images/hero.png';

export default function Home() {

	const pageContent = [
		{
			id: 1,
			icon: Pancake,
			name: 'Color generator',
			description: `Color generator tool for generating combination of
			background colors and foreground colors with
			appropriate contrast. Specify desired contrast get
			number of possible combinations.`,
			link: '/colors',
		},
		{
			id: 2,
			icon: Juice,
			name: 'Shadow generator',
			description: `Days of black shadows are gone. Forget about all
			that hassle to figure out colors for your shadows.
			Shadow generator helps you to get styles of most
			popular shadows only in few steps!`,
			link: '/shadows',
		},
		{
			id: 3,
			icon: Melon,
			name: 'Element colors',
			description: `Don’t worry about selecting different colors for all
			your different elements like buttons and links.
			Element color generator will take care of all the
			colors for you. Just provide primary color and get
			started.`,
			link: '/elements',
		},
		{
			id: 4,
			icon: Pastry,
			name: 'Dark palette',
			description: `Dark mode is the current UI trendsetter. Want to
			reduce your efforts of selecting double of every
			color for dark mode, just use dark palette generator
			and relax.`,
			link: '/dark-palette',
		},
		{
			id: 5,
			icon: Icecream,
			name: 'Golden ratio',
			description: `Selecting proper combination of colors is difficult,
			we agree. That’s where the golden ratio generator
			steps up the game of colors. Choose your favorite
			palette of colors having ideal 60%, 30% and 10%
			ratio.`,
			link: '/golden-ratio',
		},
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Colorchef - Colors, palettes and contrast</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2">
					<img
						src={hero}
						alt="hero-image"
					/>
					<div className="grid gap-4 px-8 my-8 text-center">
						<h1 className="font-head text-5xl font-bold">
							All-in-one color, palette and shadow generator.
						</h1>
						<h2 className="font-head text-2xl text-gray-400 font-bold">
							Generate a new palette and inspire other creators.
						</h2>
						{/* <a
							href="#recipes"
							className={`bg-green-500 p-2 rounded`}
						>
							Get started
						</a> */}
					</div>
				</div>
			</main>
		</div>
	);
}
