import React, { useState } from 'react';

// styles
import styles from './Colorpicker.module.css';

// components
import Colorpicker from './Colorpicker';
import {Button} from 'components/Button';

const tinycolor = require('tinycolor2');

export default function Picker(props) {
    const [openPicker, setOpenPicker] = useState(false);
    const {color, setColor} = props;

    return (
		<div
			className={`${styles.colorPicker}`}
			style={{
				padding: 0,
				border: `1px solid #${tinycolor(color).toHex().toUpperCase()}`,
			}}
		>
			<Button
				variant={`px-7 py-3 w-24 ${styles.colorPicker}`}
				style={{
					backgroundColor:
						'#' + tinycolor(color).toHex().toUpperCase(),
				}}
				onClick={() => setOpenPicker(!openPicker)}
			></Button>
			<Button
				style={{ flex: 1 }}
				variant={`px-7 py-4 w-40 bg-white`}
				onClick={() => setOpenPicker(!openPicker)}
			>
				#{tinycolor(color).toHex().toUpperCase()} 🎨
			</Button>
			{openPicker && (
				<div
					style={{
						position: 'absolute',
						zIndex: '3',
					}}
				>
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
					<Colorpicker
						isOpen={openPicker}
						color={color}
						setColor={setColor}
						onClose={setOpenPicker}
					/>
				</div>
			)}
		</div>
	);
}