import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import styles from './picker.module.css';

// components
import { Button } from 'components/Button';
import tinycolor from 'tinycolor2';

import { chooseColor } from 'slices/colorsSlice';

export const Picker = ({ onClose }) => {
	const dispatch = useDispatch();
	const [hex, setHex] = useState('f1f2f3');

	function handleSave() {
		dispatch(chooseColor(tinycolor(hex).toHex()));
		onClose(false);
	}

	function handleColorChange(e) {
		setTimeout(() => {
			console.log('Chosen color: ' + e);
			dispatch(chooseColor(e));
		}, 3000);
	}

	return (
		<div className={`${styles.picker} ${styles.pickerContainer}`}>
			<HexColorInput
				color={hex.toUpperCase()}
				onChange={setHex}
				style={{
					width: '100%',
					border: '1px solid #d9dfe6a0',
					padding: '0.5rem',
					marginBottom: '0.75rem',
				}}
			/>
			<HexColorPicker color={hex} onChange={setHex} />
			<div className="grid gap-2 mt-3">
				<Button
					variant={`bg-purple-800 text-white`}
					onClick={handleSave}
				>
					Set Color
				</Button>
			</div>
		</div>
	);
};