import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Colorcard.module.css';

// hooks
import { useInView } from 'utility/useInView';

// actions
import { copyColor } from 'slices/colorsSlice';

// components
import { Button } from 'components/Button';

export const Colorcard = ({ colorData, isQuote = false, quote = '' }) => {
	// const color1 = data.hex;
	// const color2 = '#' + originalColor;
	// const [bgStyle, setBgStyle] = useState({
	// 	color: color2,
	// 	backgroundColor: color1,
	// });
	const dispatch = useDispatch();
	const [inView, setInView] = useState(false);
	const cardRef = useRef();
	useInView(cardRef, () => {
		setInView(true);
	});

	const renderPalette = (colorData, isQuote, quote) => {
		if (isQuote && quote !== '' && colorData.length === 2) {
			return (
				<div
					className={`${styles.cardBody} rounded pb-16 m-2`}
					style={{
						backgroundColor: colorData[1],
						color: colorData[0],
					}}
				>
					<div className="px-4 py-6">
						<div className="font-head text-xl">{quote}</div>
						<br />
						<h3>- Albert Einstein</h3>
					</div>
				</div>
			);
		}

		return (
			<div className={`flex flex-col px-2 py-6`}>
				{colorData.map((color) => {
					return (
						<button
							key={color}
							className={`relative group text-center text-white`}
							style={{ backgroundColor: color }}
							onClick={() => copyHex(color.toUpperCase())}
						>
							<div className="opacity-0 py-8 px-24 lg:px-20 bg-black uppercase group-hover:opacity-40">{`${color}`}</div>
						</button>
					);
				})}
			</div>
		);
	};

	function swapColors(currentColor) {
		if (bgStyle.color === currentColor) {
			setBgStyle({ color: color2, backgroundColor: color1 });
		} else {
			setBgStyle({ color: color1, backgroundColor: color2 });
		}
	}

	async function copyHex(text) {
		dispatch(copyColor(true));
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(text);
		} else {
			document.execCommand('copy', true, text);
		}
		setTimeout(() => {
			dispatch(copyColor(false));
		}, 3000);
	}

	const copyPalette = (palette) => {
		let paletteCss = {};
		if (palette.length > 3) {
			for (let i = 0; i < palette.length; i++) {
				paletteCss[`color${i + 1}`] = palette[i];
			}
			copyHex(JSON.stringify(paletteCss));
		} else {
			let nameList = ['primary', 'secondary', 'accent'];
			for (let i = 0; i < palette.length; i++) {
				paletteCss[nameList[i]] = palette[i];
			}
			copyHex(JSON.stringify(paletteCss));
		}
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
									onClick={() => swapColors(color1)}
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
							{/* <Button
							variant={`${styles.colorButton} px-2`}
							style={{
								color: '#' + originalColor,
								backgroundColor: data.hex,
							}}
							onClick={() => copyHex(data.hex.toUpperCase())}
						>
							{data.hex}
						</Button>
						<Button
							variant={`${styles.colorButton} px-2`}
							style={{
								color: data.hex,
								backgroundColor: '#' + originalColor,
							}}
							onClick={() =>
								copyHex('#' + originalColor.toUpperCase())
							}
						>
							{'#' + originalColor}
						</Button> */}
							<button className={`${styles.SVGButton}`}>
								<svg
									className="h-6 w-6 hover:text-violet-600"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="currentColor"
								>
									<path
										strokeWidth={2}
										d="M11.6414 13.4163L4.5 20.7677V2.5H19.5V20.7677L12.3586 13.4163L12 13.0471L11.6414 13.4163Z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export const Palettecard = () => {
	return <h1>HEllOO</h1>;
};
