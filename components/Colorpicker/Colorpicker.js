import React from 'react';
import { CustomPicker } from 'react-color';
import styles from './Colorpicker.module.css';

// csstransition
import { CSSTransition } from 'react-transition-group';

// components
import {Button} from 'components/Button';

// color picker components
const tinycolor = require('tinycolor2');
let { EditableInput, Saturation, Hue } = require('react-color/lib/components/common');

function Picker() {
	return (
		<div
			style={{
				width: '18px',
				height: '18px',
                transform: 'translate(-9px, -9px)',
				borderRadius: '18px',
				background: 'var(--subtext)',
				border: '3px solid white',
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				boxSizing: 'border-box',
			}}
		/>
	);
}

function HuePicker(hsl) {
	return (
		<div
			style={{
				width: '18px',
				height: '18px',
				transform: 'translateX(-9px)',
				borderRadius: '18px',
				backgroundColor: `hsl(${hsl.h}, 100%, 50%)`,
				border: '3px solid white',
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				boxSizing: 'border-box',
			}}
		/>
	);
}

class ColorPicker extends React.Component {
    state = {
        isOpen: false,
        currentColor: ''
    }

	handleChange = (data) => {
		this.props.setColor(tinycolor(data).toHex());
        this.setState({ currentColor: data })
	};

    handleSave = () => {
        const color = tinycolor(this.state.currentColor);
		this.props.setColor(color.toHex());
        this.props.onClose(false);
    }
    
	render() {
		return (
			<CSSTransition
				in={this.props.isOpen}
				timeout={300}
				classNames={{
					enterActive: styles.pickerEnterActive,
					enter: styles.pickerEnter,
					exitActive: styles.pickerExitActive,
					exit: styles.pickerExit,
				}}
				unmountOnExit
			>
				<div className={`${styles.picker} ${styles.pickerContainer}`}>
					<EditableInput
						style={{
							input: {
								width: '100%',
								border: '1px solid #d9dfe6a0',
								padding: '0.5rem',
							},
						}}
						value={this.props.hex}
						onChange={(data) => this.handleChange(data)}
					/>
					<div className="mt-3">
						<div className={`${styles.saturationBackground}`}>
							<Saturation
								{...this.props}
								onChange={this.handleChange}
								pointer={Picker}
							/>
						</div>
						<div className={`${styles.hueBar}`}>
							<Hue
								{...this.props}
								onChange={this.handleChange}
								pointer={() => HuePicker(this.props.hsl)}
							/>
						</div>
					</div>
					<div className="grid gap-2 mt-3">
						<Button
							variant={`bg-purple-800 text-white`}
							onClick={this.handleSave}
						>
							Set Color
						</Button>
					</div>
				</div>
			</CSSTransition>
		);
	}
}

export default CustomPicker(ColorPicker);  