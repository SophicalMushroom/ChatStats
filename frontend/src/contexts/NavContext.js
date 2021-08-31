import React, { useState, createContext } from "react";

export const NavContext = createContext();

export const NavContextProvider = (props) => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [curChat, setCurChat] = useState("Bunch Of Traitors 🔪");
	const [diableDataUpload, setDiableDataUpload] = useState(false);

	return (
		<NavContext.Provider
			value={{
				isMobileNavOpen,
				setIsMobileNavOpen,
				curChat,
				setCurChat,
				diableDataUpload,
				setDiableDataUpload,
			}}
		>
			{props.children}
		</NavContext.Provider>
	);
};
export default NavContextProvider;
