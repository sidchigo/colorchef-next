import Navigation from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

export default function Layout({ children }) {
    return (
		<>
			<Navigation />
			<main className={`mt-20`}>{children}</main>
			<Footer />
		</>
	);
}