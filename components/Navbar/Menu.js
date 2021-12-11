import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from 'components/Button';

const Menu = ({ open, setOpen }) => {
	const router = useRouter();

    return (
		<div
			className={`
				flex flex-col justify-end
				bg-white h-full w-full
				fixed top-0 right-0 px-12 pb-16
				-z-10 items-center transition
				text-xl
			`}
			style={{
				transform: open ? 'translateX(0)' : 'translateX(100%)',
			}}
		>
			<Link href="/colors">
				<a
					onClick={() => setOpen(false)}
					className={`${
						router.pathname === '/colors'
							? 'text-violet-600'
							: 'text-gray-600'
						} m-4
					`}
				>
					Colors
				</a>
			</Link>
			<Link href="/shadows">
				<a
					onClick={() => setOpen(false)}
					className={`${
						router.pathname === '/shadows'
							? 'text-violet-600'
							: 'text-gray-600'
						} m-4
					`}
				>
					Shadows
				</a>
			</Link>
			<Link href="/dark-palette">
				<a
					onClick={() => setOpen(false)}
					className={`${
						router.pathname === '/dark-palette'
							? 'text-violet-600'
							: 'text-gray-600'
						} m-4
					`}
				>
					Dark Palette
				</a>
			</Link>
			<Link href="/buttons">
				<a
					onClick={() => setOpen(false)}
					className={`${
						router.pathname === '/buttons'
							? 'text-violet-600'
							: 'text-gray-600'
						} m-4
					`}
				>
					Buttons
				</a>
			</Link>
			<Link href="/golden-ratio">
				<a
					onClick={() => setOpen(false)}
					className={`${
						router.pathname === '/golden-ratio'
							? 'text-violet-600'
							: 'text-gray-600'
						} m-4
					`}
				>
					Golden Ratio
				</a>
			</Link>
			<Button
				variant={`m-4 bg-violet-600 text-white py-2 px-8 hover:bg-violet-800`}
			>
				Login
			</Button>
		</div>
	);
};

export default Menu;