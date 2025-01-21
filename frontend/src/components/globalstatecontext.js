import React, { createContext, useState } from "react";

// Create a context
export const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
    score: 0,
    allowed: false,
    code: "",
  });

  const updateUser = (user) => {
    setGlobalState((prevState) => ({ ...prevState, user: user }));
  };

  const updateCode = (code) => {
    setGlobalState((prevState) => ({ ...prevState, code: code }));
  };

  const updateScore = (score) => {
    setGlobalState((prevState) => ({ ...prevState, score }));
  };

  const updatePermissions = (permission) => {
    setGlobalState((prevState) => ({ ...prevState, allowed: permission }));
  };

  return (
    <GlobalStateContext.Provider
      value={{
        globalState,
        updateUser,
        updateScore,
        updatePermissions,
        updateCode,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
