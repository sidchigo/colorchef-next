import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Colorcard.module.css';

// actions
import { copyColor } from 'slices/colorsSlice';

// components
import {Button} from 'components/Button'

// icons
import SaveIcon from 'icons/save.svg';
import SwapIcon from 'icons/swap.svg';

const Colorcard = ({ data, originalColor }) => {
	const color1 = data.hex;
	const color2 = '#' + originalColor;
	const [bgStyle, setBgStyle] = useState({
		color: color2,
		backgroundColor: color1,
	});
	const dispatch = useDispatch();

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

	return (
		<div className={`border border-gray-100 rounded shadow-xl`}>
			<div className={`${styles.cardBody} rounded pb-16`} style={bgStyle}>
				<div className="px-4 py-6">
					<div className="font-poppins text-xl">
						Two things are infinite: the universe and human
						stupidity; and I'm not sure about the universe.
					</div>
					<br />
					<h3>- Albert Einstein</h3>
				</div>
			</div>
			<div className={`${styles.cardFooter}`}>
				<div className={`flex justify-around items-center`}>
					<button
						className={`${styles.SVGButton}`}
						onClick={() => swapColors(color1)}
					>
						<img src={SwapIcon} alt="swap" />
					</button>
					<Button
						variant={`${styles.colorButton} px-2 rounded-sm`}
						style={{
							color: '#' + originalColor,
							backgroundColor: data.hex,
						}}
						onClick={() => copyHex(data.hex.toUpperCase())}
					>
						{data.hex}
					</Button>
					<Button
						variant={`${styles.colorButton} px-2 rounded-sm`}
						style={{
							color: data.hex,
							backgroundColor: '#' + originalColor,
						}}
						onClick={() =>
							copyHex('#' + originalColor.toUpperCase())
						}
					>
						{'#' + originalColor}
					</Button>
					<button className={`${styles.SVGButton}`}>
						<img src={SaveIcon} alt="save" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Colorcard;