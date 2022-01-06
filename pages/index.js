import Head from 'next/head';
import Link from 'next/link';

// img
import colorsImg from 'images/colors.png';
import shadowsImg from 'images/shadows.png';
import darkPaletteImg from 'images/darkpalette.png';
import buttonsImg from 'images/buttons.png';
import goldenRatioImg from 'images/goldenRatio.png';

// components
import { UpButton } from 'components/Button';
import Paragraph from 'components/Paragraph';

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Colorchef - Colors, palettes and contrast</title>
			</Head>

			<div className="flex flex-col justify-center items-center h-screen">
				<div className="text-4xl md:text-7xl font-bold text-center animate-fadein-top mb-4">
					Colorchef is color-utility website to help out designers and
					developers.
				</div>
				<Link href="/colors">
					<UpButton
						variant={`animate-fadein-bottom animation-duration-1200 hover:border-purple-600`}
						icon={<span className={``}>--&gt;</span>}
						hoverFill={'bg-purple-600'}
					>
						Start exploring, it's free
					</UpButton>
				</Link>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-screen">
				<img src={colorsImg} alt="Color generator" />
				<Paragraph
					title="Don't worry about background and text colors."
					subtitle="Use our color generator to generate good contrast ratio between your text and background colors."
					buttonLink="/colors"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-green-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={'bg-green-600'}
						>
							Get started, it's free
						</UpButton>
					}
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-screen">
				<Paragraph
					title="Forget about all that hassle to figure out colors for your shadows."
					subtitle="Soft shadows are one-click away. Shadow generator helps you to get better shadows from your primary color."
					buttonLink="/shadows"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-pink-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={'bg-pink-600'}
						>
							Get started, it's free
						</UpButton>
					}
				/>
				<img
					src={shadowsImg}
					alt="Shadow generator"
					className="order-1 md:order-2"
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-screen">
				<img src={darkPaletteImg} alt="Dark Palette generator" />
				<Paragraph
					title="Dark mode is the current UI trendsetter."
					subtitle="Want to reduce your efforts of selecting double of every color for dark mode, just use dark palette generator and relax."
					buttonLink="/dark-palette"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-blue-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={'bg-blue-600'}
						>
							Get started, it's free
						</UpButton>
					}
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-screen">
				<Paragraph
					title="Buttons are important."
					subtitle="Button generator will take care of all the colors for you. Just provide primary color and quickly get fancy button styles."
					buttonLink="/buttons"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-indigo-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={'bg-indigo-600'}
						>
							Get started, it's free
						</UpButton>
					}
				/>
				<img src={buttonsImg} alt="Buttons generator" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-screen">
				<img src={goldenRatioImg} alt="Golden Ratio generator" />
				<Paragraph
					title="Get better palettes."
					subtitle="Selecting proper combination of colors is difficult, we agree. That’s where the golden ratio generator steps up the game of colors."
					buttonLink="/golden-ratio"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-orange-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={'bg-orange-600'}
						>
							Get started, it's free
						</UpButton>
					}
				/>
			</div>
			<Paragraph
				title="About us."
				subtitle="Colorchef helps in generating better colors with better contrast. We provide different utilities useful for designer and developers."
				buttonLink="/about"
				exploreButton={
					<UpButton
						variant={`animate-fadein-right animation-duration-1200 hover:border-red-600`}
						icon={<span className={``}>--&gt;</span>}
						hoverFill={'bg-red-600'}
					>
						Know more
					</UpButton>
				}
			/>
		</div>
	);
}
