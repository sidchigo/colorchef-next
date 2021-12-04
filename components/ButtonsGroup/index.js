import { useDispatch } from 'react-redux';

// components
import Picker from 'components/Colorpicker/Picker';
import { Button } from 'components/Button';

// colorpicker
const tinycolor = require('tinycolor2');

// actions
import { copyColor } from 'slices/colorsSlice';

export function ButtonGroup({ color, setColor, outline }) {
	const dispatch = useDispatch();

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
		<section className={`flex flex-col mx-auto my-4`}>
			<Picker color={color} setColor={setColor} />
			<div className={`grid grid-cols-3 gap-3`}>
				<Button
					variant={`my-4 w-32`}
					style={{
						backgroundColor: outline
							? 'white'
							: '#' + tinycolor(color).toHex(),
						border: `2px solid #${tinycolor(color).toHex()}`,
					}}
				>
					<span
						style={{
							color: outline
								? '#' + tinycolor(color).toHex()
								: tinycolor(color).toHsl().l > 0.8
								? 'black'
								: 'white',
						}}
					>
						Normal
					</span>
				</Button>
				<Button
					variant={'my-4 w-32'}
					style={{
						backgroundColor: `hsl(${
							tinycolor(color).toHsl().h
						}deg ${tinycolor(color).toHsl().s * 100}% ${
							Math.abs(tinycolor(color).toHsl().l - 0.1) * 100
						}%)`,
						border: `2px solid hsl(${
							tinycolor(color).toHsl().h
						}deg ${tinycolor(color).toHsl().s * 100}% ${
							Math.abs(tinycolor(color).toHsl().l - 0.1) * 100
						}%)`,
					}}
				>
					<span
						style={{
							color: outline
								? 'white'
								: tinycolor(color).toHsl().l > 0.8
								? 'black'
								: 'white',
						}}
					>
						Hover
					</span>
				</Button>
				<Button
					variant={`my-4 w-32`}
					style={{
						backgroundColor: outline
							? 'white'
							: `hsl(${tinycolor(color).toHsl().h}deg ${
									0.15 * 100
							  }% ${tinycolor(color).toHsl().l * 100}%)`,
						border: `2px solid #${tinycolor({
							h: tinycolor(color).toHsl().h,
							s: 0.15,
							l: tinycolor(color).toHsl().l,
							a: 1,
						}).toHex()}`,
					}}
				>
					<span
						style={{
							color: outline
								? '#' +
								  tinycolor({
										h: tinycolor(color).toHsl().h,
										s: 0.15,
										l: tinycolor(color).toHsl().l,
										a: 1,
								  }).toHex()
								: tinycolor(color).toHsl().l > 0.8
								? 'black'
								: 'white',
						}}
					>
						Disabled
					</span>
				</Button>
			</div>
			<Button
				variant={`bg-gray-900 text-white`}
				onClick={() =>
					copyHex(`
.button {
    background-color: ${outline ? 'white' : '#' + tinycolor(color).toHex()};
    border: 2px solid #${tinycolor(color).toHex()};
}

.button:hover {
    background-color: #${tinycolor({
		h: tinycolor(color).toHsl().h,
		s: tinycolor(color).toHsl().s,
		l: Math.abs(tinycolor(color).toHsl().l - 0.1),
		a: 1,
	}).toHex()};
    border: 2px solid #${tinycolor({
		h: tinycolor(color).toHsl().h,
		s: tinycolor(color).toHsl().s,
		l: Math.abs(tinycolor(color).toHsl().l - 0.1),
		a: 1,
	}).toHex()};
}

.button:disabled {
    background-color: #${tinycolor({
		h: tinycolor(color).toHsl().h,
		s: 0.15,
		l: tinycolor(color).toHsl().l,
		a: 1,
	}).toHex()};
    color: ${
		outline
			? '#' + tinycolor({
					h: tinycolor(color).toHsl().h,
					s: 0.15,
					l: tinycolor(color).toHsl().l,
					a: 1,
			  }).toHex()
			: 'white'
	}
}
`)
				}
			>
				Copy CSS
			</Button>
		</section>
	);
}
