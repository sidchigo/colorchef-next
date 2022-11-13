import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './card.module.css';

// hooks
import { useInView } from 'utility/useInView';

// actions
import { copyColor } from 'slices/colorsSlice';

// components
import { Button, Save } from 'components/Button';
import showToast from 'components/Toast';

// colorpicker
const tinycolor = require('tinycolor2');

export const QuoteCard = ({
	colorData,
	isQuote = false,
	quote = "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
	quoteBy = 'Albert Einstein',
}) => {
	const dispatch = useDispatch();
	const [inView, setInView] = useState(false);
	const cardRef = useRef();
	const [bgStyle, setBgStyle] = useState({
		backgroundColor: `#${colorData[0]}`,
		color: `#${colorData[1]}`,
	});
	useInView(cardRef, () => {
		setInView(true);
	});

	const renderPalette = (colorData, isQuote, quote) => {
		if (isQuote && quote !== '' && colorData.length === 2) {
			return (
				<div
					className={`${styles.cardBody} rounded pb-16 m-2`}
					style={bgStyle}
				>
					<div className="px-4 py-6">
						<div className="font-head text-xl">{quote}</div>
						<br />
						<h3>- {quoteBy}</h3>
					</div>
				</div>
			);
		}

		return (
			<div className={`flex flex-col px-2 py-2`}>
				{colorData.map((color, index) => {
					color = `#${tinycolor(color).toHex().toUpperCase()}`;
					if (index === 3 || index === 0) {
						return (
							<React.Fragment key={index}>
								{colorData.length > 3 && (
									<div className={`my-2 text-center`}>
										{index === 3 ? 'Dark ' : 'Light '}
										palette
									</div>
								)}
								<button
									key={color}
									className={`relative group text-center text-white`}
									style={{ backgroundColor: color }}
									onClick={() => copyHex(color)}
								>
									<div
										className={`opacity-0 ${
											colorData.length > 3
												? 'py-4'
												: 'py-8'
										} px-20 lg:px-22 bg-black uppercase group-hover:opacity-40`}
									>{`${color}`}</div>
								</button>
							</React.Fragment>
						);
					}
					return (
						<button
							key={color}
							className={`relative group text-center text-white`}
							style={{ backgroundColor: color }}
							onClick={() => copyHex(color)}
						>
							<div
								className={`opacity-0 ${
									colorData.length > 3 ? 'py-4' : 'py-8'
								} px-20 lg:px-22 bg-black uppercase group-hover:opacity-40`}
							>{`${color}`}</div>
						</button>
					);
				})}
			</div>
		);
	};

	function swapColors(currentColor) {
		if (bgStyle.color === `#${currentColor}`) {
			setBgStyle({
				color: `#${colorData[1]}`,
				backgroundColor: `#${colorData[0]}`,
			});
		} else {
			setBgStyle({
				color: `#${colorData[0]}`,
				backgroundColor: `#${colorData[1]}`,
			});
		}
	}

	async function copyHex(text) {
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText('#' + text);
		} else {
			document.execCommand('copy', true, '#' + text);
		}
		showToast(`${'#' + text} copied!`);
	}

	const copyPalette = (palette) => {
		let paletteCss = {};
		dispatch(copyColor(true));
		if (palette.length > 3) {
			for (let i = 0; i < palette.length; i++) {
				paletteCss[`color${i + 1}`] = palette[i];
			}
			copyHex(JSON.stringify(paletteCss));
		} else {
			let nameList = ['primary', 'secondary', 'accent'];
			for (let i = 0; i < palette.length; i++) {
				paletteCss[nameList[i]] = `#${tinycolor(palette[i])
					.toHex()
					.toUpperCase()}`;
			}
			copyHex(JSON.stringify(paletteCss));
		}
		setTimeout(() => {
			dispatch(copyColor(false));
		}, 3000);
	};

	return (
		<div ref={cardRef}>
			{inView && (
				<div className={`border border-gray-100 shadow-lg`}>
					{renderPalette(colorData, isQuote, quote)}
					<div className={`${styles.cardFooter}`}>
						<div className={`flex justify-around items-center`}>
							{colorData.length > 2 && (
								<button
									className={`${styles.SVGButton}`}
									onClick={() => copyPalette(colorData)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 hover:text-violet-600 pointer"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
								</button>
							)}
							{colorData.length === 2 && (
								<button
									className={`${styles.SVGButton}`}
									onClick={() => swapColors(colorData[0])}
								>
									<svg
										className="h-6 w-6 hover:text-violet-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M4 6.5C3.72386 6.5 3.5 6.72386 3.5 7C3.5 7.27614 3.72386 7.5 4 7.5V6.5ZM20.3536 7.35355C20.5488 7.15829 20.5488 6.84171 20.3536 6.64645L17.1716 3.46447C16.9763 3.2692 16.6597 3.2692 16.4645 3.46447C16.2692 3.65973 16.2692 3.97631 16.4645 4.17157L19.2929 7L16.4645 9.82843C16.2692 10.0237 16.2692 10.3403 16.4645 10.5355C16.6597 10.7308 16.9763 10.7308 17.1716 10.5355L20.3536 7.35355ZM4 7.5H20V6.5H4V7.5Z" />
										<path d="M20 17.5C20.2761 17.5 20.5 17.2761 20.5 17C20.5 16.7239 20.2761 16.5 20 16.5L20 17.5ZM3.64645 16.6464C3.45118 16.8417 3.45118 17.1583 3.64645 17.3536L6.82843 20.5355C7.02369 20.7308 7.34027 20.7308 7.53553 20.5355C7.7308 20.3403 7.7308 20.0237 7.53553 19.8284L4.70711 17L7.53553 14.1716C7.7308 13.9763 7.7308 13.6597 7.53553 13.4645C7.34027 13.2692 7.02369 13.2692 6.82843 13.4645L3.64645 16.6464ZM20 16.5L4 16.5L4 17.5L20 17.5L20 16.5Z" />
									</svg>
								</button>
							)}
							{colorData.length === 2 && (
								<>
									<Button
										variant={`${styles.colorButton} px-2`}
										style={{
											color: `#${colorData[0]}`,
											backgroundColor: `#${colorData[1]}`,
										}}
										onClick={() =>
											copyHex(colorData[1].toUpperCase())
										}
									>
										{colorData[1]}
									</Button>
									<Button
										variant={`${styles.colorButton} px-2`}
										style={{
											color: `#${colorData[1]}`,
											backgroundColor: `#${colorData[0]}`,
										}}
										onClick={() =>
											copyHex(colorData[0].toUpperCase())
										}
									>
										{colorData[0]}
									</Button>
								</>
							)}
							<Save data={colorData} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};