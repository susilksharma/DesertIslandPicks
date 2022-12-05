import React, { createContext } from "react";
import { usePersistedState } from "./usePersistedState";

// Export the user context to be used in other components
export const UserContext = createContext();

// Export the provider that is wrapped around the app in index
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
