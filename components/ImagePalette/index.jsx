import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// api
import { extractPalette } from 'slices/colorsSlice';

// components
import { Colorcard } from 'components/Colorcards/Colorcard';

const ImagePalette = () => {
    const dispatch = useDispatch();
    const [dragged, setDragged] = useState('border-gray-200 w-full');
    const palette = useSelector((state) => state.colorGeneration.palette);
    
    const dragOver = (e) => {
		e.preventDefault();
        setDragged('border-blue-400 w-2/4');
	};

	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
        setDragged('border-gray-200');
	};

    const handleDrop = (e) => {
        e.preventDefault();
        const image = e.dataTransfer.files[0];
        setDragged('border-gray-200 w-2/4');
        dispatch(extractPalette(image));
    }

	useEffect(() => console.log(palette), [palette]); 

    return (
		<div
			className={`flex flex-col md:flex-row justify-between my-8`}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={handleDrop}
		>
			<div
				className={`border ${dragged} transition w-full h-[300px] flex flex-col justify-center items-center`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-24 w-24"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<div>Drop image to get started!</div>
			</div>
			<div>
				{palette.length !== 0 &&
				<Colorcard
					colorData={palette}
				/>}
			</div>
		</div>
	);
}

export default ImagePalette;