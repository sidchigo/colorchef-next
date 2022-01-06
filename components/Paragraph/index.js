import Link from 'next/link';

const Paragraph = ({ title, subtitle, exploreButton, buttonLink }) => {
	return (
		<div className="my-0 md:my-8 text-left order-2 md:order-1">
			<h1 className="font-body leading-tight text-3xl md:text-5xl font-bold animate-fadein-right">
				{title}
			</h1>
			<h2 className="font-head text-lg md:text-2xl mt-6 text-gray-500 font-bold animate-fadein-right animation-duration-600">
				{subtitle}
			</h2>
			<Link href={buttonLink}>{exploreButton}</Link>
		</div>
	);
};

export default Paragraph;
