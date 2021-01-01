import { useState, createContext } from "react";

export const DonContext = createContext({});

const DonAppContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [announcementscontexte, setAnnouncementsContexte] = useState([]);
  return (
    <DonContext.Provider
      value={{
        user,
        isAuth,
        announcementscontexte,
        setAuthHandler: (state) => setIsAuth(state),
        setUserHandler: (user) => setUser(user),
        setAnnonceHandler: (annonce) => setAnnouncementsContexte(annonce),
      }}
    >
      {children}
    </DonContext.Provider>
  );
};

export default DonAppContext;
