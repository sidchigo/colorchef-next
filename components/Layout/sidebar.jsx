import Link from 'next/link';
import styles from './sidebar.module.css';

const ROUTES = [
    { name: 'color generator', path: 'colors' },
    { name: 'shadow generator', path: 'shadows' },
    { name: 'dark palette', path: 'dark-palette' },
    { name: 'buttons', path: 'buttons' },
    { name: 'golden ratio', path: 'golden-ratio' },
];

const LinkButton = ({ children, href }) => {
    return (
        <a href={href}>{children}</a>
    )
}

export const Sidebar = () => {
    return(
        <aside className={`col-span-1 flex flex-col text-center justify-between z-[3] ${styles.sidebar}`}>
            <div>Colorchef-logo</div>
            <div className={`flex flex-col justify-around capitalize`}>
                {ROUTES.map(route => (
                    <Link href={route.path} passHref>
                        <LinkButton>{route.name}</LinkButton>
                    </Link>
                ))}
            </div>
            <div>About</div>
        </aside>
    )
}