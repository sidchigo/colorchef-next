import Head from 'next/head';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from 'pages/colors/colors.module.css';
import { Palettecard } from 'components/Colorcards/Colorcard';

// csstransition
import { CSSTransition } from 'react-transition-group';

// components
import Header from 'components/Header/Header';
import ImagePalette from 'components/ImagePalette';

const GoldenRatio = () => {
	const [type, setType] = useState(2);
	const isCopied = useSelector((state) => state.colorGeneration.isCopied);
	const handleSelect = (id) =>{
		setType(parseInt(id));
    }

    return (
		<div>
			<Head>
				<title>
					Generate perfect palette for your website with Golden ratio
					generator
				</title>
			</Head>
			<Header title={'Golden ratio generator'}>
				Need to get a good palette instantly? Don't worry we got your
				back.
			</Header>
			<CSSTransition
				in={isCopied}
				timeout={300}
				classNames={{
					enterActive: styles.alertEnterActive,
					enter: styles.alertEnter,
					exitActive: styles.alertExitActive,
					exit: styles.alertExit,
				}}
				unmountOnExit
			>
				<div className={`${styles.copyAlert} bg-purple-800`}>
					Palette successfully copied!
				</div>
			</CSSTransition>
			<div className="mb-3 p-2 sm:mx-0 md:mx-16 lg:mx-64 xl:mx-96">
				<select
					className={`px-4 py-4 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
					id="scaleSelect"
					value={type}
					onChange={(e) => handleSelect(e.target.value)}
				>
					<option value="1">Random Palette</option>
					<option value="2">Image Extraction</option>
				</select>
			</div>
			{type == '1' ? (
				<div>
					<Palettecard />
				</div>
			) : (
				<ImagePalette />
			)}
		</div>
	);
}

export default GoldenRatio;