import React from 'react';
// import styles from './about.module.css';

const About = () => {
	return (
		<main className="container mx-auto px-4 md:px-10 lg:px-16">
			<div className="text-center py-3">
				<h1 className={`text-3xl md:text-5xl`}>About Us</h1>
			</div>
			<div className={`w-full md:w-3/4 mx-auto px-8 md:px-20 font-body`}>
				Colorchef is a product derived from the idea to solve the
				basic color-based problems faced by the UI/UX designers
				which is majorly selection of colors and color combinations.
				Two MSc grads from Mumbai decide to work on this and hence,
				Colorchef was created.
			</div>
			<h2 className="text-xl md:text-3xl text-center pt-4">Ping Us</h2>
			<div className="flex flex-col md:flex-row w-3/4 mx-auto justify-around items-center md:items-start text-center py-3">
				<div className="pb-3">
					<div className={`text-lg md:text-xl font-head`}>Telegram</div>
					<a
						className={`text-violet-600`}
						target="_blank"
						href="https://t.me/sekigangantai"
					>
						Siddhesh
					</a>
					<br />
					<a
						className={`text-violet-600`}
						target="_blank"
						href="https://t.me/chinmay_99"
					>
						Chinmay
					</a>
				</div>
				<div className="pb-3">
					<div className={`text-lg md:text-xl font-head`}>Support</div>
					<a
						className={`text-violet-600`}
						href="mailto:hellocolorchef@gmail.com"
					>
						hellocolorchef@gmail.com
					</a>
				</div>
			</div>
		</main>
	);
};

export default About;