import Header from "components/Header/Header";
import Meta from "components/Meta";
import Head from "next/head";
import React from "react";
import Link from "next/link";

const About = () => {
	return (
		<main className="container mx-auto px-4 md:px-10 lg:px-32 xl:px-48 pb-20">
			<Head>
				<title>About | Colorchef</title>
				<Meta
					title="About Colorchef — Engineering meets Aesthetic"
					url="/about"
					image={"/images/hero.png"}
					description="The collaboration between an engineer and a designer to solve color-based friction for the modern web."
				/>
			</Head>
			<Header title={"About Us"} />

			<div className="max-w-3xl mx-auto mb-16 px-4">
				<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-body">
					Colorchef is a collaboration between an engineer and a
					designer. We build utilities that eliminate the friction of
					color selection, helping creators ship aesthetic products
					without the creative fatigue.
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-12 border-y border-gray-100 py-16 mb-16">
				<div>
					<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
						The Logic
					</h3>
					<p className="text-sm text-gray-600 leading-relaxed">
						The Engineering focused on performance, security, and
						zero-latency tools. Every utility on this platform is
						architected to be serverless and static-first, ensuring
						professional-grade performance for every user, every
						time.
						<Link
							href="https://ramenlog.vercel.app/posts/ghost-architecture-colorchef-cinema"
							className="block mt-2 text-violet-600 underline underline-offset-4 hover:text-black transition-colors"
						>
							Read about our architectural standards on the Dev
							Log
						</Link>
					</p>
				</div>
				<div>
					<h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
						The Vision
					</h3>
					<p className="text-sm text-gray-600 leading-relaxed">
						We curate aesthetic color systems and engineering-first
						utilities to help developers and designers maintain
						creative momentum. Our goal is to make
						professional-grade color decisions instant and
						accessible. Ensuring that accessibility and visual
						harmony are built into every hex code generated.
					</p>
				</div>
			</div>

			{/* Contact Section */}
			<div className="text-center">
				<h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6">
					Ping Us
				</h2>
				<a
					className="text-2xl md:text-4xl font-bold text-black hover:text-violet-600 transition-colors break-words"
					href="mailto:hellocolorchef@gmail.com"
				>
					hellocolorchef@gmail.com
				</a>
				<p className="mt-4 text-sm text-gray-400 italic">
					Have a request? The chef is in.
				</p>
			</div>
		</main>
	);
};

export default About;
