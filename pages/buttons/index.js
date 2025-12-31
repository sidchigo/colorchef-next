import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import colorStyles from 'pages/colors/colors.module.css';

// components
import Header from 'components/Header/Header';
import { ButtonGroup } from 'components/ButtonsGroup';

// csstransition
import { CSSTransition } from 'react-transition-group';
import Meta from 'components/Meta';

const Elements = () => {
	const [solid, setSolid] = useState('#E9FAE3');
	const [outline, setOutline] = useState('#5094DE');
	const [pill, setPill] = useState('#7950DE');
	const [neu, setNeu] = useState('#FEEBD6');
	const [float, setFloat] = useState('#E4293E');
	const [shadow, setShadow] = useState('#188D46');
	const isCopied = useSelector((state) => state.colorGeneration.isCopied);

	return (
		<div>
			<Head>
				<title>
					Generate perfect buttons for your website with perfect
					colors
				</title>
				<Meta
					title="Generate perfect buttons for your website with perfect colors"
					url="/buttons"
					image={"/images/buttons.png"}
					description="Buttons, Buttons, Buttons....! Get the perfect button state ccording to your style."
				/>
			</Head>
			<Header title={"Button state generator"}>
				Buttons, Buttons, Buttons....! <br />
				These buttons are everywhere. Get the perfect button state
				according to your style.
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
				<ButtonGroup color={pill} setColor={setPill} pill />
				<ButtonGroup color={neu} setColor={setNeu} neu />
				<ButtonGroup color={float} setColor={setFloat} floating />
				<ButtonGroup color={shadow} setColor={setShadow} shadow />
			</div>
		</div>
	);
};

export default Elements;
