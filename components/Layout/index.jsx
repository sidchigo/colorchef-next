import Navigation from "components/Navbar/Navbar";
import Navbar from "./Navbar/Navbar";
import Footer from "components/Footer/Footer";
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Toolbar from "./Toolbar/Toolbar";

const TOAST_LIMIT = 3;

const Layout = (props) => {
	const { toasts } = useToasterStore();
    const router = useRouter();

	// limit max number of toasts
	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
			.forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
	}, [toasts]);

    const HomePage = () => {
        return (
			<>
				<Navigation />
				<main className={`container mx-auto px-4 lg:px-8`}>
					{props.children}
				</main>
				<Toaster position="bottom-center" />
				<Footer />
			</>
		);
    }

    const GridPage = () => {
        return (
			<>
				<main className={` w-full grid grid-cols-6`}>
					<Navbar />
					<article className={`col-span-5`}>
						<Toolbar {...props.toolbar} />
						{props.children}
						<Footer />
					</article>
				</main>
				<Toaster position="bottom-center" />
			</>
		);
    }

    if (router.pathname === '/') {
		return <HomePage />;
	} else {
		return <GridPage />;
	}
}

export default Layout;