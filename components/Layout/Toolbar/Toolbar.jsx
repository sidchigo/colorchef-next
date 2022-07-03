import { Auth } from "components/Auth";
import Picker from 'components/Colorpicker/Picker';
import { Button } from 'components/Button';

const Toolbar = () => {
    const Menu = () => {
        console.log('Menu rerendered')
        return (
            <div className={`flex w-full justify-between`}>
                <div className={`flex space-x-4`}>
                    <Picker />
                    <select
                        className={`p-4 px-8 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 w-full`}
                        id="scaleSelect"
                        value={quality}
                        onChange={(e) => setQuality(e.currentTarget.value)}
                    >
                        <option value="1">Good</option>
                        <option value="2">Very Good</option>
                        <option value="3">Super</option>
                        <option value="4">Ultimate</option>
                    </select>
                </div>
                <div className={`space-x-6`}>
                    <Button
                        variant={`bg-white border-2 border-gray-800 hover:bg-slate-900 text-gray-800 hover:text-white w-[200px]`}
                        onClick={() => {
                            dispatch(randomColors());
                        }}
                    >
                        Randomize
                    </Button>
                    <Button
                        variant={`bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 text-white w-[200px]`}
                        onClick={() =>
                            dispatch(
                                inputColor({
                                    hex: tinycolor(colorData.currentColor)
                                        .toHex()
                                        .toUpperCase(),
                                    scale: quality,
                                })
                            )
                        }
                    >
                        Generate
                    </Button>
                </div>
            </div>
        );
    }
    console.log('Toolbar rerendered');
    return (
		<div
			className={`bg-white shadow-md py-5 px-10 flex justify-between items-center space-x-4 sticky top-0 z-20`}
		>
			<Menu />
			<Auth />
		</div>
	);
}

export default Toolbar;