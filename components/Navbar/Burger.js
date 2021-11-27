import React from 'react';
import styles from './Burger.module.css';

import Menu from './Menu';

const Burger = ({ open, setOpen }) => {
	return (
		<React.Fragment>
			<button className={styles.burger} onClick={() => setOpen(!open)}>
				<div
					style={{
						transform: open ? 'rotate(45deg)' : 'rotate(0)',
					}}
				/>
				<div
					style={{
						opacity: open ? 0 : 1,
						transform: open ? 'translateX(20px)' : 'translateX(0)',
					}}
				/>
				<div
					style={{
						transform: open ? 'rotate(-45deg)' : 'rotate(0)',
					}}
				/>
			</button>
			<Menu open={open} />
		</React.Fragment>
	);
};

export default Burger;