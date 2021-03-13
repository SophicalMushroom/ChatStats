import React, { useState, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const baseTheme = {
	palette: {
		divider: "rgba(79, 131, 204, 0.28)",
		primary: {
			light: "#4f83cc",
			main: "#01579b",
			dark: "#002f6c",
			contrastText: "#e0e0e0",
		},
		secondary: {
			light: "#9be7ff",
			main: "#64b5f6",
			dark: "#2286c3",
			contrastText: "#37474f",
		},
	},
	typography: {
		fontFamily: "Montserrat, sans-serif",
		subtitle3: {
			fontWeight: 300,
			fontSize: "0.775rem",
			lineHeight: 1.57,
		},
		h4: {
			fontWeight: 400,
			fontSize: "1.7rem",
			lineHeight: 1.5,
		},
	},
	shape: {
		borderRadius: 8,
	},
	chartFills: [
		"#7ac4ef",
		"#f28e2b",
		"#59a14f",
		"#b6992d",
		"#86bcb6",
		"#8cd17d",
		"#f1ce63",
		"#499894",
		"#e15759",
		"#79706e",
		"#ff9d9a",
		"#bab0ac",
		"#d37295",
		"#fabfd2",
		"#b07aa1",
		"#b07aa1",
		"#d4a6c8",
		"#9d7660",
		"#d7b5a6",
		"#a0cbe8",
		"#2286c3",
		"#64b5f6",
		"#01579b",
		"#4e79a7",
	],
	chartFillsBlues: [
		"#b9ddf1",
		"#afd6ed",
		"#a5cfe9",
		"#9bc7e4",
		"#92c0df",
		"#89b8da",
		"#80b0d5",
		"#79aacf",
		"#72a3c9",
		"#6a9bc3",
		"#6394be",
		"#5b8cb8",
		"#5485b2",
		"#4e7fac",
		"#4878a6",
		"#437a9f",
		"#3d6a98",
		"#376491",
		"#305d8a",
		"#2a5783",
	],
};

const darkTheme = {
	...baseTheme,
	palette: {
		...baseTheme.palette,
		type: "dark",
		text: {
			primary: "#ffffff",
			secondary: "#8aa8d4",
		},
		background: {
			paper: "#0a1726",
			default: "#010a14",
		},
	},
};

const lightTheme = {
	...baseTheme,
	palette: {
		...baseTheme.palette,
		type: "light",
		text: {
			primary: "#002f6c",
			secondary: "rgba(14, 29, 48, 0.6)",
		},
		background: {
			paper: "#ffffff",
			default: "#f9fbfd",
		},
	},
};

export const ThemeContext = createContext({
	currentTheme: "dark",
	setTheme: null,
});

const ThemeContextProvider = (props) => {
	// Read current theme from localStorage or maybe from an api
	const currentTheme = localStorage.getItem("appTheme") || "dark";

	// State to hold the selected theme name
	const [themeName, _setThemeName] = useState(currentTheme);

	// Retrieve the theme object by theme name
	const theme = createMuiTheme(themeName === "dark" ? darkTheme : lightTheme);

	// Wrap _setThemeName to store new theme names in localStorage
	const setThemeName = (name) => {
		localStorage.setItem("appTheme", name);
		_setThemeName(name);
	};

	const contextValue = {
		currentTheme: themeName,
		setTheme: setThemeName,
	};

	return (
		<ThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
