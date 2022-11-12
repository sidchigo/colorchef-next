import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// styles
import styles from './picker.module.css';

// components
import { Picker } from '.';
import { Button, SimpleButton } from 'components/Button';

const tinycolor = require('tinycolor2');

export const PickerButton = () => {
	const [openPicker, setOpenPicker] = useState(false);
	const color = useSelector((state) => state.colorGeneration.currentColor);

	return (
		<div
			className={`${styles.colorPicker} rounded-lg`}
			style={{
				padding: 0,
				border: `2px solid #${tinycolor(color).toHex().toUpperCase()}`
			}}
		>
			<SimpleButton
				variant={`w-24 ${styles.colorPicker} rounded-l-lg`}
				style={{
					backgroundColor:
						'#' + tinycolor(color).toHex().toUpperCase(),
				}}
				onClick={() => setOpenPicker(!openPicker)}
			></SimpleButton>
			<SimpleButton
				style={{ flex: 1 }}
				variant={`w-40 bg-white rounded-r-lg`}
				onClick={() => setOpenPicker(!openPicker)}
			>
				#{tinycolor(color).toHex().toUpperCase()} 🎨
			</SimpleButton>
			{openPicker && (
				<div>
					<div
						style={{
							position: 'fixed',
							top: '0px',
							right: '0px',
							bottom: '0px',
							left: '0px',
						}}
						onClick={() => setOpenPicker(false)}
					/>
					<Picker isOpen={openPicker} onClose={setOpenPicker} />
				</div>
			)}
		</div>
	);
}