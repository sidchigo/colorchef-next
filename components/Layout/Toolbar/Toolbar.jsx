import { Auth } from "components/Auth";
import { Menu } from "./Menubar";

const Toolbar = () => {
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