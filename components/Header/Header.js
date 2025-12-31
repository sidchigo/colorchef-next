import React, { memo } from "react";

const Header = ({ title, children }) => {
	return (
		<div className="grid gap-2 px-3 mt-3 text-center pb-5 pt-4">
			<h1 className="font-head font-bold text-3xl md:text-5xl">
				{title}
			</h1>
			<h2 className="font-head font-bold text-xl md:text-2xl text-slate-500">
				{children}
			</h2>
		</div>
	);
};

export default memo(Header);
