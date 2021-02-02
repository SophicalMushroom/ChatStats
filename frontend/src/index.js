import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalContextProvider from "./contexts/GlobalProviderComposer";

ReactDOM.render(
	<GlobalContextProvider>
		<React.StrictMode>
			<CssBaseline />
			<App />
		</React.StrictMode>
	</GlobalContextProvider>,
	document.getElementById("root")
);
