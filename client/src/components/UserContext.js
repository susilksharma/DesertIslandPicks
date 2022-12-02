import React, { createContext, useReducer, useEffect } from "react";
import { usePersistedState } from "./usePersistedState";
// import { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// exporting the user context to be used in other components
export const UserContext = createContext();

// exporting the provider that is wrapped around the app in index
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = usePersistedState([], "current-user");

  const receiveCurrentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        receiveCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
