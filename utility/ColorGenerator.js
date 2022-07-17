const tinycolor = require('tinycolor2');

function RGBToHex(RGB) {
	let r = RGB[0].toString(16);
	let g = RGB[1].toString(16);
	let b = RGB[2].toString(16);

	if (r.length === 1) {
		r = '0' + r;
	}
	if (g.length === 1) {
		g = '0' + g;
	}
	if (b.length === 1) {
		b = '0' + b;
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
		Math.floor(
			100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
		),
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
	let foreground = [],
		tempPrimary = [];
	for (let i = 0; i < pair.length; i++) {
		for (let color of pair[i]) {
			color /= 255;
			color <= 0.03928
				? (color /= 12.92)
				: (color = Math.pow((color + 0.055) / 1.055, 2.4));
			i === 0 ? foreground.push(color) : tempPrimary.push(color);
		}
	}
	let color1, color2, ratio;
	color1 =
		foreground[0] * 0.2126 +
		foreground[1] * 0.7152 +
		foreground[2] * 0.0722;
	color2 =
		tempPrimary[0] * 0.2126 +
		tempPrimary[1] * 0.7152 +
		tempPrimary[2] * 0.0722;

	// finding contrast from luminance
	if (color1 > color2) {
		ratio = (color2 + 0.05) / (color1 + 0.05);
	} else {
		ratio = (color1 + 0.05) / (color2 + 0.05);
	}
	return [color1, ratio];
}

function compareContrast([luminance, ratio]) {
	let passingTest = [],
		contrastParams = [];
	if (luminance < 0.025 || luminance > 0.7) {
		contrastParams = [7, 8, 10, 12];
	} else {
		contrastParams = [6, 7, 8, 9];
	}

	for (const contrast of contrastParams) {
		ratio < 1 / contrast ? passingTest.push(true) : passingTest.push(false);
	}
	return passingTest;
}

export function findColors(inputColor, colorList = [], scale, limit = 120) {
	let originalColor = inputColor;
	inputColor = hexToRGB(inputColor);
	let sampleColors =
		colorList.length !== 0 ? colorList : generateNColors(1000);
	let foundColors = [],
		pair,
		contrastResult,
		result,
		hexColor,
		rgbColor,
		hslColor;
	for (const color of sampleColors) {
		pair = [inputColor, color];
		contrastResult = findContrast(pair);
		result = compareContrast(contrastResult);
		if (result[scale - 1] === true && foundColors.length < limit) {
			hexColor = RGBToHex(color);
			rgbColor = color;
			hslColor = RGBToHSL(color);
			foundColors.push({
				hex: hexColor,
				rgb: rgbColor,
				hsl: hslColor,
			});
		}
	}
	return {
		colors: foundColors,
		inputColor: originalColor,
		totalColors: foundColors.length,
        currentQuality: scale
	};
}

export function getGoodContrast(secondary, darkPrimary) {
	let tempPrimary,
		tempSecondary,
		pair,
		tempSecondaryHSL,
		secondaryRGB,
		darkPrimaryRGB,
		darkSecondary,
		result;
	tempPrimary = tinycolor(darkPrimary).toRgb();
	darkPrimaryRGB = [tempPrimary.r, tempPrimary.g, tempPrimary.b];
	tempSecondary = tinycolor(secondary).toRgb();
	secondaryRGB = [tempSecondary.r, tempSecondary.g, tempSecondary.b];
	pair = [secondaryRGB, darkPrimaryRGB];
	const [lum] = findContrast(pair);

    for (let i = 1; i <= 10; i++) {
        tempSecondaryHSL = tinycolor(secondary).toHsl();
		if (lum <= 0.5) {
			tempSecondaryHSL.l += i / 10;
		} else {
			tempSecondaryHSL.l -= i / 10;
		}
        tempSecondary = tinycolor(tempSecondaryHSL).toRgb();
        secondaryRGB = [tempSecondary.r, tempSecondary.g, tempSecondary.b];
        pair = [secondaryRGB, darkPrimaryRGB];
        result = compareContrast(findContrast(pair))[1];
        if (result) {
            darkSecondary = tinycolor(tempSecondary).toHex();
            break;
        }
    }
    return darkSecondary;
}

export function generateDarkPalette(primary, secondary, accent) {
	let tempPrimary,
		darkPrimary,
		darkSecondary,
		darkAccent;
	tempPrimary = tinycolor(primary).toHsl();
	tempPrimary.s = 0.2;
	tempPrimary.l = 0.15;
	darkPrimary = tinycolor(tempPrimary).toHex();

	darkSecondary = getGoodContrast(secondary, darkPrimary);
	darkAccent = getGoodContrast(accent, darkPrimary);

	return {
		primary,
		secondary,
		accent,
		darkPrimary,
		darkSecondary,
		darkAccent,
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

function getRandomLightColorHsl() {
	const hue = Math.floor(Math.random() * 360);
	const saturation = Math.floor(Math.random() * (100 + 1)) + '%';
	const lightness = Math.floor((1 + Math.random()) * (100 / 2 + 1)) + '%';
	return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';
}

export function paletteGenerator(limit = 30){
	const sampleColors = generateNColors(200);
	let primaryColor, secondaryColor, accentColor, primaryHex, secondaryArray, accentArray, goldenRatio;
	let finalArray = [];

	for (let i = 0; i < limit; i++) {
		primaryColor = getRandomLightColorHsl();
		primaryHex = tinycolor(primaryColor).toHex();
		secondaryArray = findColors(primaryHex, sampleColors, 2, 10);
		accentArray = findColors(primaryHex, sampleColors, 2, 10);

		goldenRatio = [];
		if (
			secondaryArray.colors.length !== 0 &&
			accentArray.colors.length !== 0
		) {
			// get random color from array of 10 colors
			secondaryColor =
				secondaryArray.colors[
					Math.floor(Math.random() * secondaryArray.colors.length)
				];
			accentColor =
				accentArray.colors[Math.floor(Math.random() * accentArray.colors.length)];

			goldenRatio.push(primaryHex);
			goldenRatio.push(secondaryColor.hex.substring(1));
			goldenRatio.push(accentColor.hex.substring(1));
			if (goldenRatio.length === new Set(goldenRatio).size) {
				goldenRatio.length > 2 && finalArray.push(goldenRatio);
			}
		}
	}
	finalArray = finalArray.slice(0, 12);
	return finalArray;
}
