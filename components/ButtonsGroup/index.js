import { useState } from 'react';
import { useDispatch } from 'react-redux';

// icons
import play from 'icons/play.svg';
import stop from 'icons/stop.svg';
import pause from 'icons/pause.svg';

// components
import Picker from 'components/Colorpicker/Picker';
import { Button } from 'components/Button';

// colorpicker
const tinycolor = require('tinycolor2');

// actions
import { copyColor } from 'slices/colorsSlice';
import { translate } from 'tailwindcss/defaulttheme';

export function ButtonGroup({ color, setColor, outline, pill, neu, floating, shadow }) {
	const dispatch = useDispatch();
	const [btnClass, setBtnClass] = useState('.button');

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

	const shadows = (type, color, isNeu, isFloating, isShadow) => {
		if (isFloating) {
			if (type === 'normal') {
				return 'none';
			}
			return `0px 5px 15px hsl(${tinycolor(color).toHsl().h}deg ${
				tinycolor(color).toHsl().s * 100
			}% 45% / 0.5)`;
		} else if (isNeu) {
			return `5px -5px 15px hsl(${tinycolor(color).toHsl().h}deg ${
				tinycolor(color).toHsl().s * 100
			}% 85% / 0.5), -5px 5px 15px hsl(${tinycolor(color).toHsl().h}deg ${
				tinycolor(color).toHsl().s * 100
			}% 55% / 0.5)`;
		} else if (isShadow) {
			if (type === 'normal') {
				return 'none';
			}
			return `-5px 5px 0px hsl(${tinycolor(color).toHsl().h}deg ${
				tinycolor(color).toHsl().s * 100
			}% 15% / 1)`;
		}
		return 'none';
	};

	const background = (type, color, isOutline, isNeu, isPill, isShadow) => {
		if (type === 'normal') {
			if (isOutline) {
				return 'white';
			}
			return `#${tinycolor(color).toHex()}`;
		} else if (type === 'hover') {
			if (isNeu) {
				return `linear-gradient(225deg, hsl(${
					tinycolor(color).toHsl().h
				}deg ${tinycolor(color).toHsl().s * 100}% 65% / 0.5), hsl(${
					tinycolor(color).toHsl().h
				}deg ${tinycolor(color).toHsl().s * 100}% 85% / 0.5))`;
			} else if (isPill) {
				return `hsl(${tinycolor(color).toHsl().h}deg ${
					tinycolor(color).toHsl().s * 100
				}% ${Math.abs(tinycolor(color).toHsl().l + 0.1) * 100}%)`;
			} else if (isShadow) {
				return `#${tinycolor(color).toHex()}`;
			}
			return `hsl(${tinycolor(color).toHsl().h}deg ${
				tinycolor(color).toHsl().s * 100
			}% ${Math.abs(tinycolor(color).toHsl().l - 0.1) * 100}%)`;
		} else if (type === 'disabled') {
			if (isOutline) {
				return 'white';
			} else if (isNeu) {
				return `#${tinycolor(color).toHex()}`;
			} else {
				return `hsl(${tinycolor(color).toHsl().h}deg ${0.15 * 100}% ${
					tinycolor(color).toHsl().l * 100
				}%)`;
			}
		}
	};

	const border = (pill, neu, floating) => {
		if (pill) {
			return '50px';
		} else if (neu) {
			return '8px'
		} else if (floating) {
			return '50%'
		} else {
			return 0;
		}
	}

	const borderColor = (type, isNeu, isPill, isShadow) => {
		if (type.toLowerCase() === 'normal') {
			if (!isNeu) {
				return `2px solid #${tinycolor(color).toHex()}`;
			}
			return 'none'
		} else if (type.toLowerCase() === 'hover') {
			if (isNeu) {
				return 'none';
			} else if (isPill) {
				return `2px solid hsl(${tinycolor(color).toHsl().h}deg ${
					tinycolor(color).toHsl().s * 100
				}% ${Math.abs(tinycolor(color).toHsl().l + 0.1) * 100}%)`;
			} else if (isShadow) {
				return `2px solid #${tinycolor(color).toHex()}`;
			} else {
				return `2px solid hsl(${tinycolor(color).toHsl().h}deg ${
					tinycolor(color).toHsl().s * 100
				}% ${Math.abs(tinycolor(color).toHsl().l - 0.1) * 100}%)`;
			}
		} else if (type.toLowerCase() === 'disabled') {
			if (isNeu) {
				return `2px solid #${tinycolor({
					h: tinycolor(color).toHsl().h,
					s: tinycolor(color).toHsl().s,
					l: 0.55,
					a: 1,
				}).toHex()}`;
			}
			return `2px solid #${tinycolor({
				h: tinycolor(color).toHsl().h,
				s: 0.15,
				l: tinycolor(color).toHsl().l,
				a: 1,
			}).toHex()}`;
		} else {
			return 'none';
		}
	};

	return (
		<section
			className={`flex flex-col justify-between mx-4 md:mx-8 lg:mx-12 my-4 p-4 transition-transform ease-out duration-300 border border-transparent hover:border-purple-500`}
			style={{
				backgroundColor: neu ? '#' + tinycolor(color).toHex() : 'white',
			}}
		>
			<Picker color={color} setColor={setColor} />
			<input
				className={`p-3 mt-4 border-2`}
				type="text"
				placeholder="Enter .className for button, default is .button"
				onChange={(e) => setBtnClass(e.target.value)}
			/>
			<div className={`flex flex-col xl:flex-row items-center md:justify-around mt-4`}>
				<Button
					variant={`my-4 w-full xl:w-32`}
					style={{
						background: background(
							'normal',
							color,
							outline,
							neu,
							pill,
							shadow
						),
						border: borderColor('normal', neu, pill, shadow),
						borderRadius: border(pill, neu, floating),
						boxShadow: shadows(
							'normal',
							color,
							neu,
							floating,
							shadow
						),
						width: floating && '50px',
						height: floating && '50px',
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
						{floating ? <img src={play} alt="play" /> : 'Normal'}
					</span>
				</Button>
				<Button
					variant={'my-4 w-full xl:w-32'}
					style={{
						background: background(
							'hover',
							color,
							outline,
							neu,
							pill,
							shadow
						),
						border: borderColor('hover', neu, pill, shadow),
						borderRadius: border(pill, neu, floating),
						boxShadow: shadows(
							'hover',
							color,
							neu,
							floating,
							shadow
						),
						width: floating && '50px',
						height: floating && '50px',
						transform: floating
							? `translateY(-5px)`
							: shadow
							? `translate(5px, -5px)`
							: '',
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
						{floating ? <img src={play} alt="play" /> : 'Hover'}
					</span>
				</Button>
				<Button
					variant={`my-4 w-full xl:w-32`}
					style={{
						background: background(
							'disabled',
							color,
							outline,
							neu,
							pill
						),
						border: borderColor('disabled', neu, pill, shadow),
						borderRadius: border(pill, neu, floating),
						width: floating && '50px',
						height: floating && '50px',
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
						{floating ? <img src={play} alt="play" /> : 'Disabled'}
					</span>
				</Button>
			</div>
			<Button
				variant={`bg-gray-900 text-white`}
				onClick={() =>
					copyHex(`
${btnClass} {
    background-color: ${background(
		'normal',
		color,
		outline,
		neu,
		pill,
		shadow
	)};
    border: ${borderColor('normal', neu, pill, shadow)};
	border-radius: ${border(pill, neu, floating)};
	box-shadow: ${shadows('normal', color, neu, floating, shadow)};
	width: ${floating ? '50px' : '8rem'}; /* adjust as required */
	height: ${floating ? '50px' : '4rem'}; /* adjust as required */
	${floating || shadow ? `transition: transform 300ms ease-out;` : ''}
}

${btnClass}:hover {
    background: ${background('hover', color, outline, neu, pill, shadow)};
    border: ${borderColor('hover', neu, pill, shadow)};
	border-radius: ${border(pill, neu, floating)};
	box-shadow: ${shadows('hover', color, neu, floating, shadow)};
	${
		floating
			? `transform: translateY(-5px)`
			: shadow
			? `transform: translate(5px, -5px);`
			: ''
	}
}

${btnClass}:disabled {
    background-color: ${background(
		'disabled',
		color,
		outline,
		neu,
		pill,
		shadow
	)};
	border-radius: ${border(pill, neu, floating)};
    color: ${
		outline
			? '#' +
			  tinycolor({
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
