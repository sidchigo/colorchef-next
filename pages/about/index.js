import React from 'react';
import styles from './about.module.css';

const About = () => {
	return (
		<main className="container mx-auto px-4 md:px-8 lg:px-16">
			<div className="grid px-3 mt-5 text-center pb-3 pt-4">
				<h1 className={`text-4xl`}>About Us</h1>
			</div>
			<div className="flex justify-center items-center">
				<div className={`${styles.context} font-body`}>
					Colorchef is a product derived from the idea to solve the
					basic color-based problems faced by the UI/UX designers
					which is majorly selection of colors and color combinations.
					Two MSc grads from Mumbai decide to work on this and hence,
					Colorchef was created.
				</div>
			</div>
			<h2 className="grid mt-5 text-3xl text-center pt-4">Ping Us</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 text-center pt-2 pb-5">
				<div className="pb-3">
					<div className={`text-xl font-head`}>Telegram</div>
					<a target="_blank" href="https://t.me/sekigangantai">
						Siddhesh
					</a>
					<br />
					<a target="_blank" href="https://t.me/sekigangantai">
						Chinmay
					</a>
				</div>
				<div className="pb-3">
					<div className={`text-xl font-head`}>Support</div>
					<a href="mailto:hellocolorchef@gmail.com">
						hellocolorchef@gmail.com
					</a>
				</div>
			</div>
		</main>
	);
};

export default About;