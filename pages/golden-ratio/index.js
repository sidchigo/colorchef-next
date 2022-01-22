import Head from 'next/head';
import React, { useEffect, useState } from 'react';

// components
import Header from 'components/Header/Header';
import ImagePalette from 'components/ImagePalette';
import PaletteCard from 'components/PaletteCard';

const GoldenRatio = () => {
	const [type, setType] = useState(2);
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
				<Meta
					title="Generate perfect palette for your website with Golden ratio generator"
					url="/golden-ratio"
					image={require('/images/goldenRatio.png')}
					description="Need to get a good palette instantly? Don't worry we got your back."
				/>
			</Head>
			<Header title={'Golden ratio generator'}>
				Need to get a good palette instantly? Don&apos;t worry we got
				your back.
			</Header>
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
			{type == '1' ? <PaletteCard /> : <ImagePalette />}
		</div>
	);
}

export default GoldenRatio;