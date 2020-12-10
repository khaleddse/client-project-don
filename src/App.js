//import "./App.css";
import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
//import Annonces from "./pages/Annonce/Annonces";
//import AddAnnonce from "./pages/Annonce/AddAnonce";
import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
class App extends Component {
  state = {
    showBackdrop: false,
    showMobileNav: false,
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    annonces: [],
  };
  /* SubmitAnnonceHandler = (event, authData) => {
    event.preventDefault();
    fetch(
      "http://localhost:5000/annonce/add/5fd0d0f86db36f21a4355a1e/5fca6c59a5c43627cc8046b8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objet: authData.annonceForme.objet.value,
          detail: authData.annonceForme.detail.value,
        }),
      }
    )
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Wrong Request!");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Submit failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        alert("Annonce ajouter avec succée");
        //this.props.history.replace("/");
      })
      .catch((err) => {
        alert(err);
        this.setState({
          error: err,
        });
      });
  };*/

  //-----------------------------
  signInHandler = (event, authData) => {
    event.preventDefault();
    fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 400) {
          throw new Error("verifiée votre email ou motpass");
        }

        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
        });
        localStorage.setItem("token", resData.token);
        //localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        //this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        alert(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log(this.state);
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
        this.props.history.push("/");
      })
      .catch((err) => {
        alert(err);
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
        <Route
          path="/"
          exact
          render={(props) => (
            <LoginPage
              {...props}
              onSignin={this.signInHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );

    return <Fragment>{routes}</Fragment>;
  }
}

export default withRouter(App);
