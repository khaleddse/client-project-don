import { useState, createContext } from "react";

export const DonContext = createContext({});

const DonAppContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  return (
    <DonContext.Provider
      value={{
        user,
        isAuth,
        setAuthHandler: (state) => setIsAuth(state),
        setUserHandler: (user) => setUser(user),
      }}
    >
      {children}
    </DonContext.Provider>
  );
};

export default DonAppContext;
