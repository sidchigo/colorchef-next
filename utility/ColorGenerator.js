function RGBToHex(RGB) {
    let r = RGB[0].toString(16);
    let g = RGB[1].toString(16);
    let b = RGB[2].toString(16);

    if (r.length === 1) { 
        r = "0" + r;
    }
    if (g.length === 1) { 
        g = "0" + g;
    }
    if (b.length === 1) { 
        b = "0" + b;
    }

    return '#' + r + g + b;
}

function RGBToHSL(RGB) {
    let r = RGB[0] / 255;
    let g = RGB[1] / 255;
    let b = RGB[2] / 255;

    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
        : 0;
    return [
        Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h),
        Math.floor(100 *
            (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
        Math.floor((100 * (2 * l - s)) / 2),
    ];
}

const hexToRGB = (hex) => {
    let aRgbHex = hex.match(/.{1,2}/g);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
    ];
    return aRgb;
};

function generateNColors(size) {
    let colors = [];        
    for (let i = 0; i < size; i++) {
        let color = [
            Math.ceil(Math.random() * 255),
            Math.ceil(Math.random() * 255),
            Math.ceil(Math.random() * 255),
        ];
        colors.push(color);
    }
    return colors;
}

function findContrast(pair) {
    // finding luminance of the colors in pair
    let foreground = [], background = [];
    for (let i = 0; i < pair.length; i++) {
        for (let color of pair[i]) {
            color /= 255;
            color <= 0.03928
                ? (color /= 12.92)
                : (color = Math.pow((color + 0.055) / 1.055, 2.4));
            i === 0 ? foreground.push(color) : background.push(color);
        }
    }
    let color1, color2, ratio;
    color1 =
        foreground[0] * 0.2126 +
        foreground[1] * 0.7152 +
        foreground[2] * 0.0722;
    color2 =
        background[0] * 0.2126 +
        background[1] * 0.7152 +
        background[2] * 0.0722;

    // finding contrast from luminance
    if (color1 > color2) {
        ratio = (color2 + 0.05) / (color1 + 0.05);
    } else {
        ratio = (color1 + 0.05) / (color2 + 0.05);
    }
    return [color1, ratio];
}

function compareContrast([luminance, ratio]) {
    let passingTest = [], contrastParams = [];
    if (luminance < 0.025 || luminance > 0.7) {
        contrastParams = [7, 8, 10, 12];
    } else {
        contrastParams = [6, 7, 8, 9];
    }

    for (const contrast of contrastParams) {
        (ratio < (1 / contrast)) ? passingTest.push(true) : passingTest.push(false);
    }
    return passingTest;
}

export function findColors(inputColor, colorList = [], scale) {
    let originalColor = inputColor;
    inputColor = hexToRGB(inputColor);
    let sampleColors = colorList.length !== 0 ? colorList : generateNColors(1000);
    let foundColors = [], pair, contrastResult, result, hexColor, rgbColor, hslColor;
    for (const color of sampleColors) {
        pair = [inputColor, color];
        contrastResult = findContrast(pair);
        result = compareContrast(contrastResult);
        if (result[scale - 1] === true && foundColors.length < 120) {
            hexColor = RGBToHex(color);
            rgbColor = color;
            hslColor = RGBToHSL(color);
            foundColors.push({
                hex: hexColor,
                rgb: rgbColor,
                hsl: hslColor
            });
        }
    }
    return {
		colors: foundColors,
		inputColor: originalColor,
		totalColors: foundColors.length,
	};
}

export function findRandomColors() {
	let colors = [
		'FFA987',
		'49306B',
		'F1D302',
		'A1E8CC',
		'23CE6B',
		'06D6A0',
		'DFB2F4',
		'41EAD4',
		'251605',
		'78C0E0',
	];
	let colorList = generateNColors(1000);
	let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return findColors(randomColor, colorList, 2);
}