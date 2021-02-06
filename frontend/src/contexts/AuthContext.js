import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({ firstName: "Dittam", lastName: "Dey" });

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
