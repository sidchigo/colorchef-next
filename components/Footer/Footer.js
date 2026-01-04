import React from "react";

const Footer = () => {
	return (
		<footer className={`bg-purple-200 mt-auto`}>
			<div
				className={`bg-purple-300 text-center w-full py-2 px-3 md:px-4 lg:px-5 text-xs uppercase tracking-widest`}
				style={{ color: "#080374" }}
			>
				&copy; 2021 - {new Date().getFullYear()} Colorchef • Made with
				❤️ in India
			</div>
		</footer>
	);
};

export default Footer;
