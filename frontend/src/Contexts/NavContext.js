import React, { useState, createContext } from "react";

export const NavContext = createContext();

export const NavContextProvider = (props) => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [curTab, setCurTab] = useState("Home");

	return (
		<NavContext.Provider
			value={[curTab, setCurTab, isMobileNavOpen, setIsMobileNavOpen]}
		>
			{props.children}
		</NavContext.Provider>
	);
};
export default NavContextProvider;
