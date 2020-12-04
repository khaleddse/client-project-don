//import "./App.css";
import SignupPage from "./pages/Auth/signup";
import React, { Component, Fragment } from "react";
import { withRouter, Switch } from "react-router-dom";
class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };
  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: authData.signupForm.nom.value,
        prenom: authData.signupForm.prenom.value,
        tel: authData.signupForm.tel.value,
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
      }),
    })
      .then((res) => {
        if (res.status === 404) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        //this.props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };
  render() {
    let routes = (
      <Switch>
        <SignupPage
          onSignup={this.signupHandler}
          loading={this.state.authLoading}
        ></SignupPage>
      </Switch>
    );
    return <Fragment>{routes}</Fragment>;
  }
}

export default withRouter(App);
