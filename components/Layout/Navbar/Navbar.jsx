import Link from 'next/link';
import logo from 'icons/logo.svg';

const Navbar = () => {
    return (
		<nav className={`bg-orange-300`}>
			<Link href="/">
				<a className="flex justify-self-center items-center">
					<img src={logo} width="150" height="150" alt="Colorchef" />
				</a>
			</Link>
		</nav>
	);
}

export default Navbar;