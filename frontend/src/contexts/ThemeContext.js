import React, { useState, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const baseTheme = {
	palette: {
		divider: "rgba(79, 131, 204, 0.28)",
	},
	typography: {
		subtitle3: {
			fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			fontWeight: 500,
			fontSize: "0.775rem",
			lineHeight: 1.57,
			letterSpacing: "0.00714em",
		},
		h4: {
			fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			fontWeight: 300,
			fontSize: "1.7rem",
			lineHeight: 1.5,
			letterSpacing: "0em",
		},
	},
};

const darkTheme = {
	...baseTheme,
	palette: {
		...baseTheme.palette,
		type: "dark",
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
