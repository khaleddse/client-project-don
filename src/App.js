import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
import ContactUs from "./pages/ContactUs/ContactUs";
import AddAnnoucement from "./pages/AddAnnouncement/AddAnnouncement"
import AnnouncementsList from "./views/AnnouncementsList/AnnouncementsList";
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import EditView from "./views/EditView/EditView";
const baseTheme = createMuiTheme();

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={(props) => <LoginPage {...props} />} />
        <Route path="/contactUS" exact render={(props) => <ContactUs {...props} />} />
        <Route
          path="/signup"
          exact
          render={(props) => <SignupPage {...props} />}
        />
        {localStorage.getItem("success")?<Route
          path="/AjoutAnnonce"
          exact
          render={(props) => <AddAnnoucement {...props} />}
        />:null}
        
        <Route
          path="/announcements"
          exact
          render={(props) => <AnnouncementsList {...props} />}
        />
        <Route
          path="/edit"
          exact
          render={(props) => <EditView {...props} />}
        />

        <Redirect to="/announcements" />
      </Switch>
    );

    return (
      <Fragment>
        <ThemeProvider theme={baseTheme}>{routes}</ThemeProvider>
      </Fragment>
    );
  }
}

export default withRouter(App);
