import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './colors.module.css';
import { useDispatch, useSelector } from 'react-redux';

// components
import Colorcard from 'components/Colorcards/Colorcard';
import Header from 'components/Header/Header';
import Picker from 'components/Colorpicker/Picker';
import {Button} from 'components/Button';

// csstransition
import { CSSTransition } from 'react-transition-group';

// redux
import { randomColors, inputColor } from 'slices/colorsSlice';

// colorpicker
const tinycolor = require('tinycolor2');

const Colorgeneration = () => {
	const dispatch = useDispatch();
	const colorData = useSelector((state) => state.colorGeneration);
	const isCopied = useSelector((state) => state.colorGeneration.isCopied);
	const [counter, setCounter] = useState(12);
	const [color, setColor] = useState('#E9FAE3');
	const [quality, setQuality] = useState(3);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(inputColor({ hex: 'E9FAE3', scale: 3 }));
	}, []);

	function showNextCards() {
		setCounter(counter + 12);
	}

	return (
		<div
			className={`relative container flex flex-col items-center mx-auto`}
		>
			<Head>
				<title>Generate color combinations with perfect contrast</title>
			</Head>
			<CSSTransition
				in={isCopied}
				timeout={300}
				classNames={{
					enterActive: styles.alertEnterActive,
					enter: styles.alertEnter,
					exitActive: styles.alertExitActive,
					exit: styles.alertExit,
				}}
				unmountOnExit
			>
				<div className={`${styles.copyAlert} bg-purple-800`}>
					Color successfully copied!
				</div>
			</CSSTransition>
			<Header title={'Color Generator'}>
				To generate the combinations of suitable colors for designers
				who are facing difficulty with the selection of the colors.
			</Header>
			<div className={`flex flex-col md:flex-row`}>
				<div className="mb-3">
					<div className="mb-2">Pick your color</div>
					<Picker color={color} setColor={setColor} />
				</div>
				<div className="mb-3 ml-0 md:ml-8">
					<div className="mb-2">Choose contrast quality</div>
					<select
						className={`px-4 py-4 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 rounded w-full`}
						id="scaleSelect"
						value={quality}
						onChange={(e) => setQuality(e.currentTarget.value)}
					>
						<option value="1">Good</option>
						<option value="2">Very Good</option>
						<option value="3">Super</option>
						<option value="4">Ultimate</option>
					</select>
				</div>
			</div>
			<div className="justify-content-center align-items-center px-2 mt-8">
				<div>
					<div className="grid gap-2">
						<Button
							variant={`bg-gray-900 text-white rounded w-full`}
							onClick={() =>
								dispatch(
									inputColor({
										hex: tinycolor(color)
											.toHex()
											.toUpperCase(),
										scale: quality,
									})
								)
							}
						>
							Generate
						</Button>
						<div className={`text-gray-400 text-center my-2`}>
							OR
						</div>
						<Button
							variant={`bg-gray-900 text-white rounded w-full`}
							onClick={() => {
								dispatch(randomColors());
								setCounter(12);
							}}
						>
							Randomize
						</Button>
					</div>
				</div>
				<div>
					<h2
						className={`text-2xl mt-3 flex justify-center items-center`}
					>
						{colorData.totalColors} color cards generated!
						<span className="font-normal">✨</span>
					</h2>
				</div>
			</div>
			<div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
				{colorData.colors.slice(0, counter).map((color) => {
					return (
						<Colorcard
							key={color.hex}
							data={color}
							originalColor={colorData.inputColor}
						/>
					);
				})}
			</div>
			{colorData.totalColors !== 0 &&
			!(
				counter >= colorData.totalColors &&
				counter - 12 < colorData.totalColors
			) ? (
				<div className="justify-center items-center pb-4 px-4">
					<Button
						variant={`border border-purple-800 bg-white hover:bg-purple-800 text-purple-800 hover:text-white rounded`}
						size="sm"
						onClick={() => showNextCards()}
					>
						Show More
					</Button>
				</div>
			) : (
				<div className="flex flex-col items-center my-4">
					<h3 className="text-gray-500 mt-3 flex justify-center items-center">
						We are out of colors. This color has low contrast value.
						You can go with more lighter or darker variant{' '}
					</h3>
					<a href="#" className={`text-xl font-bold`}>
						Try other colors or randomize!
					</a>
				</div>
			)}
		</div>
	);
};

export default Colorgeneration;
