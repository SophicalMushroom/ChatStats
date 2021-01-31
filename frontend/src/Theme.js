import React, { useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const CustomThemeContext = React.createContext({
	currentTheme: "dark",
	setTheme: null,
});

const CustomThemeProvider = (props) => {
	const { children } = props;
	// Read current theme from localStorage
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
		<CustomThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</CustomThemeContext.Provider>
	);
};

export default CustomThemeProvider;
