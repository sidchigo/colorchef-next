import Navigation from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

export default function Layout({ children }) {
    return (
		<>
			<Navigation />
			<main className={`container mx-auto px-4 lg:px-16 mt-12`}>{children}</main>
			<Footer />
		</>
	);
}