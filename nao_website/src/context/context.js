import React, { useState } from "react";

export const MyContext = React.createContext({
  userId: Number,
  setUserId: () => {},
  userName: String,
  setUserName: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  return (
    <MyContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      {children}
    </MyContext.Provider>
  );
};
