import styles from './sidebar.module.css';

export const Sidebar = () => {
    return(
        <aside className={`col-span-1 flex flex-col text-center justify-between z-[3] ${styles.sidebar}`}>
            <div>Colorchef-logo</div>
            <div>Menu</div>
            <div>About</div>
        </aside>
    )
}