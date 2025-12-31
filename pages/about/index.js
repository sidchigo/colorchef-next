import Header from "components/Header/Header";
import Meta from "components/Meta";
import Head from "next/head";
import React from "react";

const About = () => {
    return (
		<main className="container mx-auto px-4 md:px-10 lg:px-16">
			<Head>
				<title>About Colorchef</title>
				<Meta
					title="About Colorchef"
					url="/about"
					image={"/images/hero.png"}
					description="Colorchef is a product derived from the idea to solve the basic color-based problems faced by the UI/UX designers"
				/>
			</Head>
			<Header title={"About Us"} />
			<div className={`w-full md:w-3/4 mx-auto px-8 md:px-20 font-body`}>
				Colorchef is a product which combines multiple color-based
				utilities. It helps indie developers, solopreneuers, UI/UX
				designers to get started with their products efficiently without
				wasting time on thinking about colors. If you are craving
				colors, rest assured our chef has got you covered! If you have
				any requests our chef can glady take that up, we are a ping
				away!
			</div>
			<h2 className="text-xl md:text-3xl text-center pt-4">Ping Us</h2>
			<div className="flex flex-col md:flex-row w-3/4 mx-auto justify-around items-center md:items-start text-center py-3">
				<div className="pb-3">
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
