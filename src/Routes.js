import { DonContext } from "./contexte/donContexte";
import { useContext, useEffect } from "react";

import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
import ContactUs from "./pages/ContactUs/ContactUs";
import AddAnnoucement from "./pages/AddAnnouncement/AddAnnouncement";
import AnnoncePage from "./pages/AnnoncePage/AnnoncePage";
import AnnouncementsList from "./views/AnnouncementsList/AnnouncementsList";
import { Route, Switch, Redirect } from "react-router-dom";
import EditView from "./views/EditView/EditView";
import decode from "jwt-decode";
import UserAnnouncements from "./views/AnnouncementsList/UserAnnoncements";
import ListAvis from "./views/AvisList/ListAvis";
import UserList from "./views/Admin-UserList/Admin-UserList" 
const Routes = () => {
  const { isAuth, setAuthHandler, setUserHandler } = useContext(DonContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserHandler(decode(token));
      setAuthHandler(true);
    }
  }, []);

  let routes;
  if (isAuth) {
    routes = (
      <Switch>
      <Route
          path="/Listuser"
          exact
          render={(props) => <UserList {...props} />}
        />
        <Route
          path="/ListAvis"
          exact
          render={(props) => <ListAvis {...props} />}
        />
        <Route
          path="/profile"
          exact
          render={(props) => <UserAnnouncements {...props} />}
        />
        <Route
          path="/contactUS"
          exact
          render={(props) => <ContactUs {...props} />}
        />
        <Route path="/edit" exact render={(props) => <EditView {...props} />} />

        <Route
          path="/AjoutAnnonce"
          exact
          render={(props) => <AddAnnoucement {...props} />}
        />
        <Route
          path='/annonce'
          exact
          render={(props) => <AnnoncePage {...props} />}
        />
        <Route
          path="/announcements"
          exact
          render={(props) => <AnnouncementsList {...props} />}
        />

        {/* <Redirect to="/announcements" /> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path="/signin"
          exact
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/signup"
          exact
          render={(props) => <SignupPage {...props} />}
        />
        <Route
          path="/contactUS"
          exact
          render={(props) => <ContactUs {...props} />}
        />
        <Route
          path="/announcements"
          exact
          render={(props) => <AnnouncementsList {...props} />}
        />
        <Route
          path='/annonce'
          exact
          render={(props) => <AnnoncePage {...props} />}
        />
        <Redirect to="/announcements" />
      </Switch>
    );
  }
  return routes;
};

export default Routes;
