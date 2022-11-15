import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { randomColors, inputColor } from 'slices/colorsSlice';

// components
import { Button } from 'components/Button';
import { PickerButton } from 'components/Picker';
import { Auth } from 'components/Auth';

import styles from './layout.module.css';

// colorpicker
const tinycolor = require('tinycolor2');

const Toolbar = () => {
	const currentColor = useSelector(
		(state) => state.colorGeneration.currentColor
	);
	const quality = useSelector(
		(state) => state.colorGeneration.currentQuality
	);
	const dispatch = useDispatch();
	const [filter, filterSet] = useState(false);
	const [hide, hideSet] = useState(false);

	const toggleFilter = () => {
		filterSet(!filter);
		setTimeout(() => {
			hideSet(!hide);
		}, 150);
	}

	return (
		<div className={`fixed top-0 z-10 w-[calc(100%-19.5rem)] bg-white flex h-20 justify-between ${styles.toolbarStyle}`}>
			<div className={`flex`}>
				<div className={`flex space-x-4 py-2.5 px-4 ${filter ? '-translate-x-full' : 'translate-x-0'} ${hide ? 'hidden' : 'block'} transition ease-in`}>
					<PickerButton />
					<select
						className={`p-2 bg-white px-8 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
						id="scaleSelect"
						value={quality}
						onChange={(e) =>
							dispatch(chooseQuality(e.currentTarget.value))
						}
					>
						<option value="1">Good</option>
						<option value="2">Very Good</option>
						<option value="3">Super</option>
						<option value="4">Ultimate</option>
					</select>
					
				</div>
				<Button onClick={() => toggleFilter()}>Filter</Button>
			</div>
			
			<div className={`flex space-x-4 py-2.5 px-4`}>
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
				<div className={`hidden lg:block`}>
					<Auth />
				</div>
			</div>
			{/* <div className={`hidden lg:block`}>
				<Auth />
			</div> */}
		</div>
	);
};

export default Toolbar;
