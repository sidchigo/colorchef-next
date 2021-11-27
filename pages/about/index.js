import React from 'react';
import styles from './about.module.css';

const About = () => {
	return (
		<main className="container mx-auto px-4 md:px-8 lg:px-16 min-h-screen">
			<div className="grid px-3 mt-5 text-center pb-3 pt-4">
				<h1 className={`text-4xl`}>About Us</h1>
			</div>
			<div className="flex justify-center items-center">
				<div className={`${styles.context}`}>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book.
				</div>
			</div>
			<h2 className="grid mt-5 text-3xl text-center pt-4">Ping Us</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 text-center pb-3 pt-2 pb-5">
				<div className="pb-3">
					<h3 className={`text-xl`}>Telegram</h3>Siddhesh
					<br />
					Chinmay
				</div>
				<div className="pb-3">
					<h3 className={`text-xl`}>Instgram</h3>@ColorChef
				</div>
				<div className="pb-3">
					<h3 className={`text-xl`}>Support</h3>Colorchef@gmail.com
				</div>
			</div>
		</main>
	);
};

export default About;