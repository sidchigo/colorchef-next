import Link from 'next/link';
import styles from './sidebar.module.css';
import logo from 'icons/logo.svg';

export const Sidebar = () => {
    return(
        <aside className={`col-span-1 flex flex-col text-center items-center justify-between z-[3] ${styles.sidebar}`}>
            <div className={`flex items-center justify-center h-20 w-full p-3`}>
                <Link href="/">
                    <a>
                        <img src={logo} width="150" height="150" alt="Colorchef" />
                    </a>
                </Link>
            </div>
            <div className={`flex flex-col justify-around capitalize bg-slate-400 w-full`}>
                <Link href='colors' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold hover:bg-pastel-emerald hover:text-dark-emerald transition-all`}>color generator</a>
                </Link>
                <Link href='shadows' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold hover:bg-pastel-sakura hover:text-dark-sakura transition-all`}>shadow generator</a>
                </Link>
                <Link href='dark-palette' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold hover:bg-pastel-sky hover:text-dark-sky transition-all`}>dark palette</a>
                </Link>
                <Link href='buttons' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold hover:bg-pastel-choco hover:text-dark-choco transition-all`}>buttons</a>
                </Link>
                <Link href='golden-ratio' passHref>
                    <a className={`p-4 mx-6 my-3 rounded-xl font-semibold hover:bg-golden-yellow hover:text-golden-brown transition-all`}>golden ratio</a>
                </Link>
            </div>
            <div>About</div>
        </aside>
    )
}