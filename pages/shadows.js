import React, { useState } from 'react';
import Head from 'next/head';

// components
import { Picker } from 'components/Picker';
import { ShadowCard } from 'components/Card';
import Meta from 'components/Meta';

const tinycolor = require('tinycolor2');

const Shadows = () => {
	const [color, setColor] = useState('#F59292');

	return (
		<div className="mb-4">
			<Head>
				<title>Generate perfect soft shadows for your website</title>
				<Meta
					title="Generate perfect soft shadows for your website"
					url="/shadows"
					image={require('/images/shadows.png')}
					description="Days of grumpy old shadows are gone! Choose background color and get better shadows for your UI."
				/>
			</Head>
			<div className="block sm:hidden bg-purple-100 text-purple-800 p-4 my-4">
				Note: Tap at desired location to move light source and shadow.
			</div>
			<div className="flex justify-center items-center">
				<div xl={3} lg={3} md={4} sm={12} className="mb-3">
					<Picker color={color} setColor={setColor} />
				</div>
			</div>
			<div className={``}>
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