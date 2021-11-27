import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// styles
import styles from './darkpalette.module.css';

// components
import Header from 'components/Header/Header';
import Picker from 'components/Colorpicker/Picker';

// bootstrap
import Button from 'components/Button';

const tinycolor = require('tinycolor2');

const Darkpalette = () => {
	const [color1, setColor1] = useState('F5FFFF');
	const [color2, setColor2] = useState('7EC5FF');
	const [color3, setColor3] = useState('092666');

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
    ]

	return (
		<div className={`container mx-auto px-8`}>
			<Head>
				<title>
					Generate perfect dark color palette for your website
				</title>
			</Head>
			<Header title={'Dark Palette Generator'}>
				To generate a dark color palette from the colors which you
				provide
			</Header>
			<div className={`grid grid-cols-1 md:grid-cols-3 gap-8 my-4`}>
				<div className="my-2">
					<div className="mb-2">Primary Color</div>
					<Picker color={color1} setColor={setColor1} />
				</div>
				<div className="my-2">
					<div className="mb-2">Secondary Color</div>
					<Picker color={color2} setColor={setColor2} />
				</div>
				<div className="my-2">
					<div className="mb-2">Accent Color</div>
					<Picker color={color3} setColor={setColor3} />
				</div>
			</div>
			<div className="flex justify-center items-center m-2">
				<Button
					variant={`bg-purple-800 text-white rounded hover:bg-purple-900 w-full md:w-auto`}
				>
					Generate palette
				</Button>
			</div>
			<div className="flex justify-center items-center m-2 pt-4">
				Preview Below
			</div>
			<div
				className={`${styles.previewBody} rounded-lg`}
				style={{
					backgroundColor: '#' + tinycolor(color1).toHex(),
				}}
			>
				<div
					className="flex justify-between p-4 rounded-t-lg"
					style={{ 
                        backgroundColor: '#' + tinycolor(color2).toHex(),
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
							src='/images/hero.png'
							alt="hero-image"
						/>
						<div
							className="flex justify-center items-center"
							style={{ color: '#' + tinycolor(color3).toHex() }}
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
							backgroundColor: '#' + tinycolor(color2).toHex(),
						}}
					>
						<div className="text-lg md:text-2xl font-bold mb-4 text-gray-800">
							These are demo text
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{dummyText.map((para) => (
								<div key={para.title}>
									<div className={`font-bold text-gray-800`}>
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
										className={`${styles.cubeBox}`}
										style={{
											backgroundColor: '#FFFFFF',
											border: `1px solid #${color3}`,
										}}
									>
										<div>Card Title</div>
										<div className="mb-2 text-muted">
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