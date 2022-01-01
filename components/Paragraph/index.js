import React, { useRef, useState } from 'react';
import Link from 'next/link';

// hooks
import { useInView } from 'utility/useInView';

const Paragraph = ({ title, subtitle, exploreButton, buttonLink }) => {
	const [inView, setInView] = useState(false);
	const paraRef = useRef();
	useInView(paraRef, () => {
		setInView(true);
	});

	return (
		<div ref={paraRef} className="my-8 text-left">
			{inView && (
				<React.Fragment>
					<h1 className="font-body leading-tight text-5xl font-bold animate-fadein-right">
						{title}
					</h1>
					<h2 className="font-head text-2xl mt-6 text-gray-500 font-bold animate-fadein-right animation-duration-600">
						{subtitle}
					</h2>
					<Link href={buttonLink}>{exploreButton}</Link>
				</React.Fragment>
			)}
		</div>
	);
};

export default Paragraph;
