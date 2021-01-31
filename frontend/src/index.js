import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import CustomThemeProvider from "./Theme";

ReactDOM.render(
	<CustomThemeProvider>
		<CssBaseline />
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</CustomThemeProvider>,
	document.getElementById("root")
);
