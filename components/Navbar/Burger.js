import React from 'react';
import styles from './Burger.module.css';

import Menu from './Menu';

const Burger = ({ open, setOpen }) => {
	return (
		<React.Fragment>
			<button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} onClick={() => setOpen(!open)}>
				<span />
				<span />
			</button>
			<Menu open={open} setOpen={setOpen} />
		</React.Fragment>
	);
};

export default Burger;