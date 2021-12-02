import Navigation from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";

export default function Layout({ children }) {
    return (
		<>
			<Navigation />
			<main className={`mt-10`}>{children}</main>
			<Footer />
		</>
	);
}