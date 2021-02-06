import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalContextProvider from "./contexts/GlobalProviderComposer";

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <CssBaseline />
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
