import React from 'react';

export default function Header(props) {
    return (
		<div className="grid gap-2 px-3 mt-3 text-center pb-5 pt-4">
			<h1 className="font-head font-bold text-3xl md:text-5xl">{props.title}</h1>
			<h2 className="font-head font-bold text-xl md:text-2xl text-slate-500">{props.children}</h2>
		</div>
	);
}