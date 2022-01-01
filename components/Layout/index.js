import Navigation from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
    return (
		<>
			<Navigation />
			<main className={`container mx-auto px-4 lg:px-8`}>
				{children}
			</main>
			<Toaster position="bottom-center" />
			<Footer />
		</>
	);
}