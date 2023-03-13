import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import styles from "./Colorpicker.module.css";

// components
import { Button } from "components/Button";
import tinycolor from "tinycolor2";
import { useRouter } from "next/router";

const ColorPicker = ({ color, setColor, onClose }) => {
    const router = useRouter();

    function handleSave() {
        setColor(tinycolor(color).toHex());
        const quality = router.query.colorcode.slice(-1);
        router.push(
            "/colors/[colorcode]",
            `/colors/${tinycolor(color).toHex()}${Date.now()}${quality}`,
            {
                shallow: true,
            }
        );
        onClose(false);
    }

    return (
        <div className={`${styles.picker} ${styles.pickerContainer}`}>
            <HexColorInput
                color={color.toUpperCase()}
                onChange={setColor}
                style={{
                    width: "100%",
                    border: "1px solid #d9dfe6a0",
                    padding: "0.5rem",
                    marginBottom: "0.75rem",
                }}
            />
            <HexColorPicker color={color} onChange={setColor} />
            <div className="grid gap-2 mt-3">
                <Button
                    variant={`bg-purple-800 text-white`}
                    onClick={handleSave}
                >
                    Set Color
                </Button>
            </div>
        </div>
    );
};

export default ColorPicker;
