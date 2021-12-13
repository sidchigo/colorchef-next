import Head from 'next/head';

// components
import Header from 'components/Header/Header';

const GoldenRatio = () => {
    return (
		<div>
			<Head>
				<title>
					Generate perfect palette for your website with Golden ratio generator
				</title>
			</Head>
			<Header title={'Golden ratio generator'}>
				Need to get a good palette instantly? Don't worry we got your
				back.
			</Header>
		</div>
	);
}

export default GoldenRatio;