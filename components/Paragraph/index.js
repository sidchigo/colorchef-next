import Link from 'next/link';

const Paragraph = ({ title, subtitle, exploreButton, buttonLink }) => {
	return (
		<div className="my-4 md:my-8 text-left order-2 lg:order-1">
			<div className="font-body leading-tight text-lg md:text-2xl lg:text-4xl font-bold animate-fadein-right">
				{title}
			</div>
			<div className="font-head text-md md:text-lg lg:text-2xl mt-6 text-gray-500 font-bold animate-fadein-right animation-duration-600">
				{subtitle}
			</div>
			<Link href={buttonLink} passHref>{exploreButton}</Link>
		</div>
	);
};

export default Paragraph;
