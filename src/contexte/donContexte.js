import { useState, createContext } from "react";

export const DonContext = createContext({});

const DonAppContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [announcementscontexte, setAnnouncementsContexte] = useState([]);
  const [ListCategories, setListCategories] = useState([]);
  return (
    <DonContext.Provider
      value={{
        user,
        isAuth,
        admin,
        announcementscontexte,
        ListCategories,
        isAuthAdmin,
        setAuthHandler: (state) => setIsAuth(state),
        setAuthHandlerAdmin: (state) => setIsAuthAdmin(state),
        setUserHandler: (user) => setUser(user),
        setAdminHandler: (admin) => setAdmin(admin),
        setAnnonceHandler: (annonce) => setAnnouncementsContexte(annonce),
        setListCategHandler: (categ) => setListCategories(categ),
      }}
    >
      {children}
    </DonContext.Provider>
  );
};

export default DonAppContext;
