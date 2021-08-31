import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
	const [user, setUser] = useState({
		firstName: "Dittam",
		lastName: "Dey",
		isLoggedin: true,
	});

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthContextProvider;
