import { DonContext } from "./contexte/donContexte";
import { useContext, useEffect } from "react";

import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
import ContactUs from "./pages/ContactUs/ContactUs";
import AddAnnoucement from "./pages/AddAnnouncement/AddAnnouncement";
import AnnouncementsList from "./views/AnnouncementsList/AnnouncementsList";
import { Route, Switch, Redirect } from "react-router-dom";
import EditView from "./views/EditView/EditView";
import decode from "jwt-decode";

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
        <Redirect to="/announcements" />
      </Switch>
    );
  }
  return routes;
};

export default Routes;