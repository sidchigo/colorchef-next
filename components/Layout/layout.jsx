import Toolbar from './toolbar';
import Footer from './footer';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useEffect } from 'react';
import { Sidebar } from './sidebar';

const TOAST_LIMIT = 3;

export const Layout = ({ children }) => {
	const { toasts } = useToasterStore();

	// limit max number of toasts
	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
			.forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
	}, [toasts]);

	return (
		<div className='flex w-screen'>
            <Sidebar />
            <div>
                <Toolbar />
                <main className={`container mx-auto px-4 lg:px-8`}>{children}</main>
                <Footer />
            </div>
			<Toaster position="bottom-center" />
		</div>
	);
};