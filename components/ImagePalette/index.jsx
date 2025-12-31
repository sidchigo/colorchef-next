import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from "next/image";

// api
import { extractPalette, resetImagePalette } from "slices/colorsSlice";

// components
import { Colorcard } from "components/Colorcards/Colorcard";
import PulseCardLoader from "components/PulseCardLoader";

// image compression
import Resizer from "react-image-file-resizer";
import tinycolor from "tinycolor2";
import { useCallback } from "react";

const ImagePalette = () => {
	const dispatch = useDispatch();
	const [dragged, setDragged] = useState("border-gray-200 w-full");
	const [preview, setPreview] = useState();
	const [file, setFile] = useState();
	let palette = useSelector((state) => state.colorGeneration.palette);
	const status = useSelector((state) => state.colorGeneration.status);

	const dragOver = (e) => {
		e.preventDefault();
		setDragged("border-blue-400");
	};

	const dragEnter = (e) => {
		e.preventDefault();
	};

	const dragLeave = (e) => {
		e.preventDefault();
		setDragged("border-gray-200");
	};

	const compressImage = useCallback(
		(file) => {
			// resizing image to 200 x 200
			const dimensions = 200;
			try {
				new Promise(() => {
					Resizer.imageFileResizer(
						file,
						dimensions,
						dimensions,
						"WEBP",
						100,
						0,
						(uri) => {
							dispatch(extractPalette(uri));
						},
						"file",
						100,
						100
					);
				});
			} catch (e) {
				console.log(e);
			}
		},
		[dispatch]
	);

	const handleImage = (e) => {
		e.preventDefault();
		// using dataTransfer for drag and drop
		// and target for file input
		const fileHandler =
			e.type === "drop" ? e.dataTransfer.files : e.target.files;
		if (!fileHandler || fileHandler.length === 0) {
			setFile(undefined);
			return;
		}
		const image = fileHandler[0];
		setFile(image);
		setDragged("border-gray-200");
	};

	const renderPalette = () => {
		if (status === "loading") {
			return <PulseCardLoader />;
		} else if (palette.length === 0) {
			return null;
		} else {
			const hexPalette = palette.map((color) =>
				tinycolor(color).toHex().toUpperCase()
			);
			return <Colorcard colorData={hexPalette} />;
		}
	};

	useEffect(() => {
		if (!file) {
			setPreview(undefined);
			return;
		}

		const fileUrl = URL.createObjectURL(file);
		setPreview(fileUrl);

		// handle compression and send to api
		compressImage(file);

		return () => {
			URL.revokeObjectURL(fileUrl);
		};
	}, [file, compressImage]);

	useEffect(() => {
		return () => {
			dispatch(resetImagePalette());
		};
	}, [dispatch]);

	return (
		<label
			htmlFor="image"
			className={`flex flex-col lg:flex-row justify-between items-center space-x-0 md:space-x-4 my-8`}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={handleImage}
		>
			<div
				className={`border ${
					palette.length !== 0 ? "w-full md:w-2/4 mb-4" : "w-full"
				} transition h-[300px] flex flex-col justify-center items-center`}
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
				<div>Drop image or click to get started!</div>
				<input
					type="file"
					id="image"
					className="hidden"
					onChange={handleImage}
				/>
			</div>
			<Image
				className={`${
					file
						? "w-full border-2 border-gray-400 md:w-2/4 mb-4 h-[300px] object-cover"
						: "hidden"
				}`}
				src={preview}
				alt="preview"
				width={450}
				height={300}
			/>
			<>{renderPalette()}</>
		</label>
	);
};

export default ImagePalette;