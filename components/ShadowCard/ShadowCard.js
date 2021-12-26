import React, { useState, useRef, useEffect } from 'react';
import styles from './ShadowCard.module.css';


// utility
import Copy from 'utility/CopyUtility';
import showToast from 'components/Toast';

export default function ShadowCard({ background, hue, backgroundLum }) {
	const [xcord, setXCord] = useState('50%');
	const [ycord, setYCord] = useState('20px');
	const [pageX, setPageX] = useState(0);
	const [pageY, setPageY] = useState(0);
	const [shadowLum, setShadowLum] = useState(0);
	const [shadowSat, setShadowSat] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);
	const [lightOpacity, setLightOpacity] = useState(1);
	const [translate, setTranslate] = useState(['-50%', '0']);
	const playground = useRef();

	useEffect(() => {
		if (backgroundLum * 100 < 10) {
			setShadowLum(8);
			setShadowSat(60);
		} else if (backgroundLum * 100 < 30) {
			setShadowLum(10);
			setShadowSat(80);
		} else if (backgroundLum * 100 < 80) {
			setShadowLum(30);
			setShadowSat(40);
		} else if (backgroundLum * 100 >= 90) {
			setShadowLum(70);
			setShadowSat(30);
		} else {
			setShadowLum(20);
			setShadowSat(50);
		}
	}, [backgroundLum])

	function saveCoordinates(e) {
		setLightOpacity(1);
		if (playground.hasOwnProperty('current')) {
			setXCord(
				e.clientX -
					parseInt(playground.current.getBoundingClientRect().left)
			);
			setYCord(
				e.clientY -
					parseInt(playground.current.getBoundingClientRect().top) -
					25
			);
			setPageX(
				e.pageX -
					playground.current.offsetLeft -
					parseInt(playground.current.offsetWidth / 2)
			);
			setPageY(
				e.pageY -
					playground.current.offsetTop -
					parseInt(playground.current.offsetHeight / 2)
			);
			setContainerWidth(playground.current.getBoundingClientRect().left);
			setContainerHeight(playground.current.getBoundingClientRect().top);
		}
	}

	function resetLightSource(e) {
		setXCord('50%');
		setYCord('20px');
		if (
			ycord < 0 ||
			ycord > containerHeight ||
			xcord < 0 ||
			xcord > containerWidth
		) {
			setLightOpacity(0);
		} else {
			setLightOpacity(1);
		}
		setTranslate(['-50%', '0']);
		if (playground.hasOwnProperty('current')) {
			setPageX(parseInt(playground.current.getBoundingClientRect().left));
			setPageY(50);
			setContainerWidth(playground.current.offsetWidth / 2);
			setContainerHeight(playground.current.offsetHeight / 2);
		}
	}

	return (
		<button
			className={styles.cardBody}
			onMouseMove={(e) => saveCoordinates(e)}
			onMouseLeave={(e) => resetLightSource(e)}
			ref={playground}
			onClick={() => {
				Copy(
					`box-shadow(${pageX / -25}px ${
						pageY / -25
					}px 8px hsl(${hue.h.toFixed(
						2
					)}deg ${shadowSat}% ${shadowLum}% / 0.5))`
				);
				showToast('Shadow styles copied!')
			}}
			style={{
				backgroundColor: background,
			}}
		>
			<div
				className={styles.centerCard}
				style={{
					backgroundColor: `hsl(${hue.h}, 100%, 98%)`,
					'--drop-shadow': `drop-shadow(${pageX / -25}px ${
						pageY / -25
					}px 8px hsl(${
						hue.h
					}deg ${shadowSat}% ${shadowLum}% / 0.5))`,
					transition: 'filter 100ms ease-out',
				}}
			></div>
			<span
				className={styles.lightSource}
				style={{
					left: xcord,
					top: ycord,
					opacity: ycord < 0 ? 0 : 1,
					transform: `translate(${translate[0]}, ${translate[1]})`,
				}}
			></span>
			<div className={styles.copyButton}>Click to copy style</div>
		</button>
	);
}
