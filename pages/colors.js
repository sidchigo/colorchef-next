import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

// components
import { QuoteCard } from 'components/Card';
// import Header from 'components/Header/Header';
// import Picker from 'components/Colorpicker/Picker';
// import {Button} from 'components/Button';

// redux
import { randomColors, inputColor } from 'slices/colorsSlice';
import { Meta } from 'components/Meta';
import { Layout } from 'components/Layout';

// colorpicker
const tinycolor = require('tinycolor2');

// const Colorgeneration = () => {
	// const dispatch = useDispatch();
	// const colors = useSelector((state) => state.colorGeneration.colors);
	// const totalColors = useSelector((state) => state.colorGeneration.totalColors);
	// const initialColor = useSelector((state) => state.colorGeneration.inputColor);
	// const [quality, setQuality] = useState(1);

// 	useEffect(() => {
// 		window.scrollTo(0, 0);
// 		dispatch(inputColor({ hex: 'E9FAE3', scale: 1 }));
// 	}, [dispatch]);

// 	return (
//         <div
//             className={`relative container flex flex-col items-center mx-auto`}
//         >
//             <Head>
//                 <title>
//                     Generate color combinations with perfect contrast
//                 </title>
//                 <Meta
//                     title="Generate color combinations with perfect contrast"
//                     url="/colors"
//                     image={require('/images/colors.png')}
//                     description="Still confused finding the perfect color combo? Let us help you solve your confusion."
//                 />
//             </Head>
            {/* <div className="mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
                {colors.map((color) => {
                    return (
                        <Colorcard
                            key={color.hex}
                            colorData={[
                                tinycolor(color.hex).toHex().toUpperCase(),
                                initialColor,
                            ]}
                            isQuote
                        />
                    );
                })}
            </div> */}
//             {totalColors === 0 ? (
//                 <div className="flex flex-col items-center my-4">
//                     <h3 className="text-gray-500 my-8 flex justify-center items-center">
//                         We are out of colors. This color has low contrast
//                         value. You can go with more lighter or darker
//                         variant
//                     </h3>
//                     <a href="#" className={`text-xl font-bold`}>
//                         Try other colors or randomize!
//                     </a>
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center my-4">
//                     <h3 className="text-gray-500 my-6 flex justify-center items-center">
//                         We are out of colors.
//                     </h3>
//                     <a href="#" className={`text-xl font-bold`}>
//                         Explore more colors!
//                     </a>
//                 </div>
//             )}
//         </div>
// 	);
// };

// export default Colorgeneration;

const Colorgeneration = () => {
    const dispatch = useDispatch();
	const colors = useSelector((state) => state.colorGeneration.colors);
	const totalColors = useSelector((state) => state.colorGeneration.totalColors);
	const initialColor = useSelector((state) => state.colorGeneration.inputColor);
	const [quality, setQuality] = useState(1);
    return (
        <div>
            <Head>
                <title>
                    Generate color combinations with perfect contrast
                </title>
                <Meta
                    title="Generate color combinations with perfect contrast"
                    url="/colors"
                    image={require('/images/colors.png')}
                    description="Still confused finding the perfect color combo? Let us help you solve your confusion."
                />
            </Head>
            <div className="mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
                {colors.map((color) => (
                    <QuoteCard
                        key={color.hex}
                        colorData={[
                            tinycolor(color.hex).toHex().toUpperCase(),
                            initialColor,
                        ]}
                        isQuote
                    />
                ))}
            </div>
            Hey
        </div>
    )
}

export default Colorgeneration;
