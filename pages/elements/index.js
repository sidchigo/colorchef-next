import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import colorStyles from 'pages/colors/colors.module.css';

// components
import Header from 'components/Header/Header';
import { ButtonGroup } from 'components/ButtonsGroup';

// csstransition
import { CSSTransition } from 'react-transition-group';

const Elements = () => {
	const [solid, setSolid] = useState('#E9FAE3');
	const [outline, setOutline] = useState('#5094DE');
	const isCopied = useSelector((state) => state.colorGeneration.isCopied);

	return (
		<div>
			<Head>
				<title>Generate perfect colors for your website elements</title>
			</Head>
			<Header title={'Element color generator'}>
				To generate colors for different states of buttons
			</Header>
			<CSSTransition
				in={isCopied}
				timeout={300}
				classNames={{
					enterActive: colorStyles.alertEnterActive,
					enter: colorStyles.alertEnter,
					exitActive: colorStyles.alertExitActive,
					exit: colorStyles.alertExit,
				}}
				unmountOnExit
			>
				<div className={`${colorStyles.copyAlert} bg-purple-800`}>
					Color successfully copied!
				</div>
			</CSSTransition>
			<div className={`grid grid-cols-1 md:grid-cols-2 my-8`}>
				<ButtonGroup color={solid} setColor={setSolid} />
				<ButtonGroup color={outline} setColor={setOutline} outline />
			</div>
		</div>
	);
};

export default Elements;
