import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
import AddAnnoucement from "./pages/AddAnnouncement/AddAnnouncement"
import AnnouncementsList from "./views/AnnouncementsList/AnnouncementsList";
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

const baseTheme = createMuiTheme();

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={(props) => <LoginPage {...props} />} />
        <Route
          path="/signup"
          exact
          render={(props) => <SignupPage {...props} />}
        />
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
        <Redirect to="/" />
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
