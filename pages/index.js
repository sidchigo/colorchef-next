import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// components
import { UpButton } from "components/Button";
import Paragraph from "components/Paragraph";
import Meta from "components/Meta";

const HERO_EXPLORE_LINK = "/cinema";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Colorchef - Colors, palettes and contrast</title>
				<Meta
					title="Colorchef - Colors, palettes and contrast"
					url="/"
					image={"/images/hero.png"}
					description="Professional color utilities for designers and developers. Generate accessible contrast ratios, CSS shadows, and discover aesthetic color palettes inspired by cinema."
				/>
			</Head>
			<header className="flex flex-col justify-center items-center h-screen">
				<h1 className="text-3xl md:text-4xl lg:text-7xl font-body font-bold text-center animate-fadein-top mb-4">
					Color utilities for the modern web.
				</h1>
				<div className="text-lg md:text-2xl lg:text-4xl text-gray-500 font-head font-bold text-center animate-fadein-top mb-4">
					Professional tools for shadows, contrast, and cinematic
					inspiration.
				</div>
				<Link href={HERO_EXPLORE_LINK}>
					<UpButton
						variant={`animate-fadein-bottom animation-duration-1200 hover:border-purple-600`}
						icon={<span className={``}>--&gt;</span>}
						hoverFill={"bg-purple-600"}
					>
						Start exploring, it&apos;s free
					</UpButton>
				</Link>
			</header>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Paragraph
					title="Cinema-grade palettes for your next project."
					subtitle="Extract high-fidelity hex codes and aesthetic color schemes from iconic film frames."
					buttonLink="/cinema"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-red-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-red-600"}
						>
							Get started, it&apos;s free
						</UpButton>
					}
				/>
				<Image
					src={"/images/cinema.png"}
					alt="Cinema Palette generator"
					className="order-1 lg:order-2 object-contain rounded-lg shadow-sm"
					width={600}
					height={400}
				/>
			</div>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Image
					src={"/images/colors.png"}
					alt="Color generator"
					width={581}
					height={388}
				/>
				<Paragraph
					title="Don't worry about background and text colors."
					subtitle="Use our color generator to generate good contrast ratio between your text and background colors."
					buttonLink="/colors"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-green-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-green-600"}
						>
							Get started, it&apos;s free
						</UpButton>
					}
				/>
			</div>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Paragraph
					title="Forget about all that hassle to figure out colors for your shadows."
					subtitle="Soft shadows are one-click away. Shadow generator helps you to get better shadows from your primary color."
					buttonLink="/shadows"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-pink-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-pink-600"}
						>
							Get started, it&apos;s free
						</UpButton>
					}
				/>
				<Image
					src={"/images/shadows.png"}
					alt="Shadow generator"
					className="order-1 lg:order-2 object-contain"
					width={560}
					height={364}
				/>
			</div>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Image
					src={"/images/darkpalette.png"}
					alt="Dark Palette generator"
					width={720}
					height={342}
				/>
				<Paragraph
					title="Dark mode is the current UI trendsetter."
					subtitle="Want to reduce your efforts of selecting double of every color for dark mode, just use dark palette generator and relax."
					buttonLink="/dark-palette"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-blue-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-blue-600"}
						>
							Get started, it&apos;s free
						</UpButton>
					}
				/>
			</div>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Paragraph
					title="Buttons are important."
					subtitle="Button generator will take care of all the colors for you. Just provide primary color and quickly get fancy button styles."
					buttonLink="/buttons"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-indigo-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-indigo-600"}
						>
							Get started, it&apos;s free
						</UpButton>
					}
				/>
				<Image
					src={"/images/buttons.png"}
					alt="Buttons generator"
					width={472}
					height={304}
				/>
			</div>
			<div className="my-16 lg:my-2 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-8 items-center justify-items-center h-full lg:h-screen">
				<Image
					src={"/images/goldenRatio.png"}
					alt="Golden Ratio generator"
					width={591}
					height={369}
				/>
				<Paragraph
					title="Get better palettes."
					subtitle="Selecting proper combination of colors is difficult, we agree. That’s where the golden ratio generator steps up the game of colors."
					buttonLink="/golden-ratio"
					exploreButton={
						<UpButton
							variant={`animate-fadein-right animation-duration-1200 hover:border-orange-600`}
							icon={<span className={``}>--&gt;</span>}
							hoverFill={"bg-orange-600"}
						>
							Get started, it&apos;s free
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
						hoverFill={"bg-red-600"}
					>
						Know more
					</UpButton>
				}
			/>
		</div>
	);
}
