import React, { useState, createContext } from "react";

export const NavContext = createContext();

export const NavContextProvider = (props) => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [curTab, setCurTab] = useState("Overview");
	const [curChat, setCurChat] = useState("Bunch Of Traitors 🔪");

	return (
		<NavContext.Provider
			value={{
				curTab,
				setCurTab,
				isMobileNavOpen,
				setIsMobileNavOpen,
				curChat,
				setCurChat,
			}}
		>
			{props.children}
		</NavContext.Provider>
	);
};
export default NavContextProvider;
