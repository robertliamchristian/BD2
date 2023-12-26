// UserContext.js
import React, { createContext, useState } from 'react';

// Set the default context value to an object with userId and setUserId
export const UserContext = createContext({ userId: null, setUserId: () => {} });

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
