import React from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
	const router = useRouter();
	const shouldStick = router.pathname !== '/';
	return (
		<footer
			className={`${shouldStick && 'sticky'} bg-white bottom-0 mt-auto`}
		>
			<div
				className={`text-center w-full py-2 px-3 md:px-4 lg:px-5 `}
				style={{ color: '#080374' }}
			>
				&copy; 2021 Colorchef • Made with ❤️ in India
			</div>
		</footer>
	);
};

export default Footer;