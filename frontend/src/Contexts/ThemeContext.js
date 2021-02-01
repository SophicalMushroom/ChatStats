import { useState, createContext } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
	const theme = createMuiTheme({
		palette: { type: themeName },
	});

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
