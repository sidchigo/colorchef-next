import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// styles
import styles from './darkpalette.module.css';

// components
import Header from 'components/Header/Header';
import Picker from 'components/Colorpicker/Picker';
import Save from 'components/Save';

// bootstrap
import {Button} from 'components/Button';

// utility
import { generateDarkPalette } from 'utility/ColorGenerator';
import Meta from 'components/Meta';

const tinycolor = require('tinycolor2');

const Darkpalette = () => {
	const [lightPrimary, setLPrimary] = useState('FCF3EC');
	const [lightSecondary, setLSecondary] = useState('491515');
	const [lightAccent, setLAccent] = useState('E78F2E');
	const [darkPrimary, setDPrimary] = useState('');
	const [darkSecondary, setDSecondary] = useState('');
	const [darkAccent, setDAccent] = useState('');
	const [generated, setGenerated] = useState(false);

    const dummyText = [
        {
            title: 'First feature',
            descr: 'A feature that is the best in industry.'
        },
        {
            title: 'Second feature',
            descr: 'A feature that is the most wanted in industry.'
        },
        {
            title: 'Third feature',
            descr: 'A feature that is the best for UX'
        },
    ];

	const handleGenerate = () => {
		const { primary, secondary, accent, darkPrimary, darkSecondary, darkAccent } = generateDarkPalette(lightPrimary, lightSecondary, lightAccent);
		setLPrimary(primary);
		setLSecondary(secondary);
		setLAccent(accent);
		setDPrimary(darkPrimary);
		setDSecondary(darkSecondary);
		setDAccent(darkAccent);
		setGenerated(true);
	}

	const handleReset = () => {
		setDPrimary('FCF3EC');
		setDSecondary('491515');
		setDAccent('E78F2E');
		setGenerated(false);
	}

	return (
		<div>
			<Head>
				<title>
					Generate perfect dark color palette for your website
				</title>
				<Meta
					title="Generate perfect dark color palette for your website"
					url="/dark-palette"
					image={require('/images/darkpalette.png')}
					description="Want to follow the ongoing trend of dark mode? Enter your palette and explore the dark colors."
				/>
			</Head>
			<Header title={'Dark Palette Generator'}>
				Want to follow the ongoing trend of dark mode? <br /> Enter your
				palette and explore the dark colors.
			</Header>
			<div className={`grid grid-cols-1 md:grid-cols-3 gap-8 my-4`}>
				<div className="my-2">
					<div className="mb-2">Primary Color</div>
					<Picker
						color={generated ? darkPrimary : lightPrimary}
						setColor={generated ? setDPrimary : setLPrimary}
					/>
				</div>
				<div className="my-2">
					<div className="mb-2">Secondary Color</div>
					<Picker
						color={generated ? darkSecondary : lightSecondary}
						setColor={generated ? setDSecondary : setLSecondary}
					/>
				</div>
				<div className="my-2">
					<div className="mb-2">Accent Color</div>
					<Picker
						color={generated ? darkAccent : lightAccent}
						setColor={generated ? setDAccent : setLAccent}
					/>
				</div>
			</div>
			<div className="flex justify-center items-center m-2">
				<Button
					variant={`bg-purple-800 px-6 text-white hover:bg-purple-900 w-full md:w-auto`}
					onClick={generated ? handleReset : handleGenerate}
				>
					{generated ? 'Reset palette' : 'Generate palette'}
				</Button>
				{generated && (
					<div className={`ml-4`}>
						<Save
							data={[
								lightPrimary.toUpperCase(),
								lightSecondary.toUpperCase(),
								lightAccent.toUpperCase(),
								darkPrimary.toUpperCase(),
								darkSecondary.toUpperCase(),
								darkAccent.toUpperCase(),
							]}
						/>
					</div>
				)}
			</div>
			<div className="flex justify-center items-center m-2 pt-4">
				Preview Below
			</div>
			<div
				className={`${styles.previewBody} rounded`}
				style={{
					backgroundColor:
						'#' +
						tinycolor(
							generated ? darkPrimary : lightPrimary
						).toHex(),
				}}
			>
				<div
					className="flex justify-between p-4 rounded-t"
					style={{
						backgroundColor:
							'#' +
							tinycolor(
								generated ? darkSecondary : lightSecondary
							).toHex(),
						color:
							tinycolor(
								generated ? darkSecondary : lightSecondary
							).toHsl().l > 0.8
								? 'black'
								: 'white',
					}}
				>
					<div>Your website</div>
					<ul className="flex justify-between">
						<li className="px-2">Home</li>
						<li className="px-2">About</li>
						<li className="px-2">Contact Us</li>
					</ul>
				</div>
				<div className="container mx-auto px-4 md:px-16 mt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<img
							className="mt-4 px-5"
							src={require('/images/hero.png')}
							alt="hero-image"
						/>
						<div
							className="flex justify-center items-center"
							style={{
								color:
									'#' +
									tinycolor(
										generated ? darkAccent : lightAccent
									).toHex(),
							}}
						>
							<div className="px-3 mt-4 mx-4 text-center">
								<h2 className="text-3xl md:text-5xl text-center p-2">
									Welcome to the Preview
								</h2>
								<h3>
									This preview helps you to see the website{' '}
									<br />
									with your color palette and also shows{' '}
									<br />
									preview of dark mode for your website.
								</h3>
							</div>
						</div>
					</div>
					<div
						className={`${styles.spaceDemo} mt-4 p-6`}
						style={{
							backgroundColor:
								'#' +
								tinycolor(
									generated ? darkSecondary : lightSecondary
								).toHex(),
						}}
					>
						<div
							className="text-lg md:text-2xl font-bold mb-4"
							style={{
								color:
									tinycolor(
										generated
											? darkSecondary
											: lightSecondary
									).toHsl().l > 0.8
										? 'black'
										: 'white',
							}}
						>
							These are demo text
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{dummyText.map((para) => (
								<div key={para.title}>
									<div
										className={`font-bold`}
										style={{
											color:
												tinycolor(
													generated
														? darkSecondary
														: lightSecondary
												).toHsl().l > 0.8
													? 'black'
													: 'white',
										}}
									>
										{para.title}
									</div>
									{para.descr}
								</div>
							))}
						</div>
					</div>
					<div
						className={`grid grid-cols-1 lg:grid-cols-3 gap-4 text-center py-6`}
					>
						{[0, 1, 2].map((item) => {
							return (
								<div className={``} key={item}>
									<div
										className={`${styles.cubeBox} bg-slate-200`}
									>
										<div>Card Title</div>
										<div className="mb-2 text-slate-800">
											Card Subtitle
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Darkpalette;