import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components/Button';
import { PickerButton } from 'components/Picker';
import { Sidebar } from './sidebar';

const Toolbar = () => {
	const currentColor = useSelector(
		(state) => state.colorGeneration.currentColor
	);
	const quality = useSelector(
		(state) => state.colorGeneration.currentQuality
	);
	const dispatch = useDispatch();

	return (
		<div className="flex h-20 w-full justify-between bg-slate-300">
			<div className={`flex space-x-4 py-2.5 px-4`}>
				<PickerButton />
				<select
					className={`p-2 px-8 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
					id="scaleSelect"
					value={quality}
					onChange={(e) =>
						dispatch(chooseQuality(e.currentTarget.value))
					}
				>
					<option value="1">Good</option>
					<option value="2">Very Good</option>
					<option value="3">Super</option>
					<option value="4">Ultimate</option>
				</select>
			</div>
			<div className={`flex space-x-4 py-2.5 px-4`}>
				<Button
					variant={`bg-white border-2 border-gray-800 hover:bg-slate-900 text-gray-800 hover:text-white w-[200px]`}
					onClick={() =>
						dispatch(
							inputColor({
								hex: tinycolor(currentColor)
									.toHex()
									.toUpperCase(),
								scale: quality,
							})
						)
					}
				>
					Generate
				</Button>
				<Button
					variant={`bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 text-white w-[200px]`}
					onClick={() => {
						dispatch(randomColors());
					}}
				>
					Randomize
				</Button>
			</div>
		</div>
	);
};

export default Toolbar;
