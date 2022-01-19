import React, { useState } from 'react';
import Head from 'next/head';

// components
import Header from 'components/Header/Header';
import Picker from 'components/Colorpicker/Picker';
import ShadowCard from 'components/ShadowCard/ShadowCard';

const tinycolor = require('tinycolor2');

const Shadows = () => {
	const [color, setColor] = useState('#F59292');

	return (
		<div className="mb-4">
			<Head>
				<title>Generate perfect soft shadows for your website</title>
			</Head>
			<Header title={'Shdow Generator'}>
				Days of grumpy old shadows are gone! <br />
				Choose background color and get better shadows for your UI.
			</Header>
			<div className='block sm:hidden bg-purple-100 text-purple-800 p-4 my-4'>
				Note: Tap at desired location to move light source and shadow.
			</div>
			<div className="flex justify-center items-center">
				<div xl={3} lg={3} md={4} sm={12} className="mb-3">
					<Picker color={color} setColor={setColor} />
				</div>
			</div>
            <div xl={12} lg={3} md={4} sm={12}>
                <ShadowCard
                    backgroundLum={tinycolor(color).toHsl().l}
                    background={'#' + tinycolor(color).toHex()}
                    hue={tinycolor(color).toHsl()}
                />
            </div>
		</div>
	);
};

export default Shadows;