import { Auth } from 'components/Auth';
import Picker from 'components/Colorpicker/Picker';
import { Button } from 'components/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { randomColors, inputColor, chooseQuality } from 'slices/colorsSlice';
const tinycolor = require('tinycolor2');

const Menu = () => {
    const currentColor = useSelector(
		(state) => state.colorGeneration.currentColor
	);
    const quality = useSelector(
		(state) => state.colorGeneration.currentQuality
	);
	const dispatch = useDispatch();

	return (
		<div className={`flex w-full justify-between`}>
			<div className={`flex space-x-4`}>
				<Picker />
				<select
					className={`p-4 px-8 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
					id="scaleSelect"
					value={quality}
					onChange={(e) => dispatch(chooseQuality(e.currentTarget.value))}
				>
					<option value="1">Good</option>
					<option value="2">Very Good</option>
					<option value="3">Super</option>
					<option value="4">Ultimate</option>
				</select>
			</div>
			<div className={`space-x-6`}>
				<Button
					variant={`bg-white border-2 border-gray-800 hover:bg-slate-900 text-gray-800 hover:text-white w-[200px]`}
					onClick={() =>
						dispatch(
							inputColor({
								hex: tinycolor(currentColor)
									.toHex()
									.toUpperCase(),
								scale: quality,
							})
						)
					}
				>
					Generate
				</Button>
				<Button
					variant={`bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 text-white w-[200px]`}
					onClick={() => {
						dispatch(randomColors());
					}}
				>
					Randomize
				</Button>
			</div>
		</div>
	);
};

export { Menu };