import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

// components
import { Colorcard } from "components/Colorcards/Colorcard";
import Header from "components/Header/Header";
import Picker from "components/Colorpicker/Picker";
import { Button } from "components/Button";

// redux
import { randomColors, inputColor } from "slices/colorsSlice";
import Meta from "components/Meta";
import { useRouter } from "next/router";

// colorpicker
const tinycolor = require("tinycolor2");

const Colorgeneration = () => {
    const dispatch = useDispatch();
    const colorData = useSelector((state) => state.colorGeneration);
    const [counter, setCounter] = useState(12);
    const router = useRouter();
    const { colorcode } = router.query;
    const [color, setColor] = useState(`#${colorcode?.slice(0, 6)}`);
    const [quality, setQuality] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (colorcode) {
            dispatch(
                inputColor({
                    hex: colorcode.slice(0, 6),
                    scale: colorcode.slice(-1),
                    ts: colorcode.slice(6, -1),
                })
            );
        }
    }, [dispatch, colorcode]);

    useEffect(() => {
        const query = router.query.colorcode;
        console.log("QUERY: ", query);
        if (query) {
            setColor(`#${query.slice(0, 6)}`);
            setQuality(query.slice(-1));
        }
    }, [router.query.colorcode]);

    const handleQuality = (e) => {
        const quality = e.currentTarget.value;
        setQuality(quality);
        router.push(
            "/colors/[colorcode]",
            `/colors/${tinycolor(color).toHex()}${Date.now()}${quality}`
        );
    };

    const handleGenerate = () => {
        dispatch(
            inputColor({
                hex: tinycolor(color).toHex().toUpperCase(),
                scale: quality,
            })
        );
        router.push(
            "/colors/[colorcode]",
            `/colors/${tinycolor(color).toHex()}${Date.now()}${quality}`
        );
    };

    const staging = "colorchef-git-enhancements-sidchigo.vercel";

    return (
        <div
            className={`relative container flex flex-col items-center mx-auto`}
        >
            <Head>
                <title>Generate color combinations with perfect contrast</title>
                <meta
                    property="og:url"
                    content={`https://${staging}.app/api/og?color=${color.slice(
                        0,
                        1
                    )}`}
                />
                <meta
                    property="og:image"
                    content={`https://${staging}.app/api/og?color=${color.slice(
                        0,
                        1
                    )}`}
                />
                {/* <Meta
                    title="Generate color combinations with perfect contrast"
                    colorcode={color}
                    image={require("/images/colors.png")}
                    description="Still confused finding the perfect color combo? Let us help you solve your confusion."
                /> */}
            </Head>
            <Header title={"Color Generator"}>
                Still confused finding the perfect color combo? let us help you
                solve your confusion.
            </Header>
            <div className={`flex flex-col md:flex-row`}>
                <div className="mb-3">
                    <div className="mb-2">Pick your color</div>
                    <Picker color={color} setColor={setColor} />
                </div>
                <div className="mb-3 ml-0 md:ml-8">
                    <div className="mb-2">Choose contrast quality</div>
                    <select
                        className={`px-4 py-4 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
                        id="scaleSelect"
                        value={quality}
                        onChange={handleQuality}
                    >
                        <option value="1">Good</option>
                        <option value="2">Very Good</option>
                        <option value="3">Super</option>
                        <option value="4">Ultimate</option>
                    </select>
                </div>
            </div>
            <div className="justify-content-center align-items-center px-4">
                <div className="grid gap-2 justify-center">
                    {/* <Button
						variant={`bg-gray-800 hover:bg-slate-900 text-white w-[300px]`}
						onClick={handleGenerate}
					>
						Generate
					</Button> */}
                    <div className={`text-gray-400 text-center my-2`}>OR</div>
                    <Button
                        variant={`bg-gray-800 hover:bg-slate-900 text-white w-[300px]`}
                        onClick={() => {
                            dispatch(randomColors());
                            setCounter(12);
                        }}
                    >
                        Randomize
                    </Button>
                </div>
                <h2
                    className={`text-lg md:text-2xl mt-3 flex justify-center items-center`}
                >
                    {colorData.totalColors} color cards generated!
                    <span className="font-normal">✨</span>
                </h2>
            </div>
            <div className="mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
                {colorData.colors.map((color) => {
                    return (
                        <Colorcard
                            key={color.hex}
                            colorData={[
                                tinycolor(color.hex).toHex().toUpperCase(),
                                colorData.inputColor,
                            ]}
                            isQuote
                        />
                    );
                })}
            </div>
            {colorData.totalColors === 0 ? (
                <div className="flex flex-col items-center my-4">
                    <h3 className="text-gray-500 my-8 flex justify-center items-center">
                        We are out of colors. This color has low contrast value.
                        You can go with more lighter or darker variant
                    </h3>
                    <a href="#" className={`text-xl font-bold`}>
                        Try other colors or randomize!
                    </a>
                </div>
            ) : (
                <div className="flex flex-col items-center my-4">
                    <h3 className="text-gray-500 my-6 flex justify-center items-center">
                        We are out of colors.
                    </h3>
                    <a href="#" className={`text-xl font-bold`}>
                        Explore more colors!
                    </a>
                </div>
            )}
        </div>
    );
};

export default Colorgeneration;
