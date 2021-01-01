import { useState, createContext } from "react";

export const DonContext = createContext({});

const DonAppContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [announcementscontexte, setAnnouncementsContexte] = useState([]);
  const [ListCategories, setListCategories] = useState([]);
  return (
    <DonContext.Provider
      value={{
        user,
        isAuth,
        announcementscontexte,
        ListCategories,
        setAuthHandler: (state) => setIsAuth(state),
        setUserHandler: (user) => setUser(user),
        setAnnonceHandler: (annonce) => setAnnouncementsContexte(annonce),
        setListCategHandler :(categ)=>setListCategories(categ)
      }}
    >
      {children}
    </DonContext.Provider>
  );
};

export default DonAppContext;
