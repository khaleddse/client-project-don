import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
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
