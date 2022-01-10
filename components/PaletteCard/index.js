import { useEffect, useState } from "react";

// components
import { Colorcard } from "components/Colorcards/Colorcard";
import Loader from 'components/Loader';

// utility
import { paletteGenerator } from "utility/ColorGenerator";
import { Button } from "components/Button";

const PaletteCard = () => {
    const [data, setData] = useState([]);
	const [status , setStatus] = useState("loading");
    useEffect( async () => {
		setStatus("loading")
        await setData(paletteGenerator());
		setStatus("idle")
    }, []);

    const fetchMorePalettes = async () => {
		setStatus("loading")
        const newPalettes = await paletteGenerator();
        const newData = data.concat(newPalettes);
        setData(newData);
		setStatus("idle")
    }

    return (
		<>
		{
			status === "loading" ? 
				<div className='flex justify-center'>
					<Loader/> 
				</div>
			:
				<>
					<div className="mx-4 sm:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-3 mb-3">
						{data.length !== 0 &&
							data.map((color, index) => <Colorcard key={index} colorData={color} />)}
					</div>
					<div className={`flex justify-center items-center my-8`}>
						<Button
							variant={`bg-violet-600 hover:bg-violet-700 text-white py-6 px-8`}
							onClick={fetchMorePalettes}
						>
							Generate more!
						</Button>
					</div>
				</>
		}
		</>
	);
}

export default PaletteCard;