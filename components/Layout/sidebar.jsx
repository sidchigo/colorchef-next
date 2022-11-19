import Link from 'next/link';
import styles from './layout.module.css';
import logo from 'icons/logo.svg';
import { useRouter } from 'next/router'

export const Sidebar = () => {
    const router = useRouter();
    return(
        <aside className={`w-[19.5rem] h-full fixed flex flex-col text-center justify-between items-center bg-gray-100 z-[11] ${styles.sidebarShadow}`}>
            <div className={`flex items-center justify-center h-20 w-full p-3 bg-white`}>
                <Link href="/">
                    <a>
                        <img src={logo} width="150" height="150" alt="Colorchef" />
                    </a>
                </Link>
            </div>
            <div className={`flex items-stretch flex-col justify-center py-auto capitalize w-full`}>
                <Link href='colors' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold ${router.pathname === '/colors' ? 'bg-pastel-emerald text-dark-emerald': ''} hover:bg-pastel-emerald hover:text-dark-emerald transition-all`}>color generator</a>
                </Link>
                <Link href='shadows' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold ${router.pathname === '/shadows' ? 'bg-pastel-sakura text-dark-sakura': ''} hover:bg-pastel-sakura hover:text-dark-sakura transition-all`}>shadow generator</a>
                </Link>
                <Link href='dark-palette' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold ${router.pathname === '/dark-palette' ? 'bg-bg-pastel-sky text-dark-sky': ''} hover:bg-pastel-sky hover:text-dark-sky transition-all`}>dark palette</a>
                </Link>
                <Link href='buttons' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold ${router.pathname === '/buttons' ? 'bg-pastel-choco text-dark-choco': ''} hover:bg-pastel-choco hover:text-dark-choco transition-all`}>buttons</a>
                </Link>
                <Link href='golden-ratio' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold ${router.pathname === '/golden-ratio' ? 'bg-golden-yellow text-golden-brown': ''} hover:bg-golden-yellow hover:text-golden-brown transition-all`}>golden ratio</a>
                </Link>
            </div>
            <div className={`bg-white flex w-full justify-center py-16`}>About</div>
        </aside>
    )
}