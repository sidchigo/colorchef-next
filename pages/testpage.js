import ColorPicker from "components/Colorpicker/Colorpicker";
import Picker from "components/Colorpicker/Picker";
import { useState } from "react";

const TestPage = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Picker />
            {/* <ColorPicker onClose={setOpen} /> */}
        </div>
    )
}

export default TestPage;