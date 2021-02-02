import React, { cloneElement } from "react";
import ThemeContextProvider from "./ThemeContext";
import NavContextProvider from "./NavContext";

const GlobalProviderComposer = ({ contexts, children }) => {
	return contexts.reduceRight(
		(kids, parent) =>
			cloneElement(parent, {
				children: kids,
			}),
		children
	);
};

const GlobalContextProvider = ({ children }) => {
	return (
		<GlobalProviderComposer
			contexts={[<ThemeContextProvider />, <NavContextProvider />]}
		>
			{children}
		</GlobalProviderComposer>
	);
};

export default GlobalContextProvider;
