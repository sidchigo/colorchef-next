import Navigation from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useEffect } from 'react';

const TOAST_LIMIT = 3;

const Layout = ({ children }) => {
	const { toasts } = useToasterStore();

	// limit max number of toasts
	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
			.forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
	}, [toasts]);

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

export default Layout;