import React, { createContext, useState } from "react";

// Create a context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    score: 0,
    allowed: false
  });

  const updateUser = (user) => {
    setGlobalState((prevState) => ({ ...prevState, user }));
  };

  const updateScore = (score) => {
    setGlobalState((prevState) => ({ ...prevState, score }));
  };

  const updatePermissions = (permission) => {
    setGlobalState((prevState) => ({ ...prevState, permission }));
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalState, updateUser, updateScore, updatePermissions }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
