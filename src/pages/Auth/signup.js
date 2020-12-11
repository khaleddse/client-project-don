import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { required, length, email } from "../util/validators";
import Auth from "./Auth";
import "./Auth.css";
import { signupHandler } from "../../services/auth-service";

class Signup extends Component {
  state = {
    signupForm: {
      nom: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      prenom: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      tel: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      formIsValid: false,
    },
    loading: false,
  };

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      /* for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }*/
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };
  onSignupHandler = async (e) => {
    e.preventDefault();
    const { nom, prenom, tel, email, password } = this.state.signupForm;
    const signupData = {
      nom: nom.value,
      prenom: prenom.value,
      tel: tel.value,
      email: email.value,
      password: password.value,
    };
    this.setState({ loading: true });
    await signupHandler(signupData);
    this.setState({ loading: false });
    this.props.history.push("/");
  };

  render() {
    return (
      <Auth>
        <form onSubmit={(e) => this.onSignupHandler(e)} className="form">
          <TextField
            id="nom"
            label="Nom"
            onChange={(e) => this.inputChangeHandler("nom", e.target.value)}
            onBlur={this.inputBlurHandler.bind(this, "nom")}
            value={this.state.signupForm["nom"].value}
            valid={this.state.signupForm["nom"].valid}
            touched={this.state.signupForm["nom"].touched}
          />
          {/*<Input
            id="nom"
            label="Nom"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "nom")}
            value={this.state.signupForm["nom"].value}
            valid={this.state.signupForm["nom"].valid}
            touched={this.state.signupForm["nom"].touched}
         />*/}
          <TextField
            id="prenom"
            label="Prenom"
            onChange={(e) => this.inputChangeHandler("prenom", e.target.value)}
            onBlur={this.inputBlurHandler.bind(this, "prenom")}
            value={this.state.signupForm["prenom"].value}
            valid={this.state.signupForm["prenom"].valid}
            touched={this.state.signupForm["prenom"].touched}
          />
          {/*<Input
            id="prenom"
            label="Prenom"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "prenom")}
            value={this.state.signupForm["prenom"].value}
            valid={this.state.signupForm["prenom"].valid}
            touched={this.state.signupForm["prenom"].touched}
          />*/}
          <TextField
            id="tel"
            label="Numéro de mobile"
            onChange={(e) => this.inputChangeHandler("tel", e.target.value)}
            onBlur={this.inputBlurHandler.bind(this, "tel")}
            value={this.state.signupForm["tel"].value}
            valid={this.state.signupForm["tel"].valid}
            touched={this.state.signupForm["tel"].touched}
          />
          {/*<Input
            id="tel"
            label="Numéro de mobile"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "tel")}
            value={this.state.signupForm["tel"].value}
            valid={this.state.signupForm["tel"].valid}
            touched={this.state.signupForm["tel"].touched}
          />*/}
          <TextField
            id="email"
            label="E-Mail"
            type="email"
            onChange={(e) => this.inputChangeHandler("email", e.target.value)}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.signupForm["email"].value}
            valid={this.state.signupForm["email"].valid}
            touched={this.state.signupForm["email"].touched}
          />
          {/* <Input
            id="email"
            label="E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.signupForm["email"].value}
            valid={this.state.signupForm["email"].valid}
            touched={this.state.signupForm["email"].touched}
         />*/}
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={(e) =>
              this.inputChangeHandler("password", e.target.value)
            }
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.signupForm["password"].value}
            valid={this.state.signupForm["password"].valid}
            touched={this.state.signupForm["password"].touched}
          />
          {/*<Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.signupForm["password"].value}
            valid={this.state.signupForm["password"].valid}
            touched={this.state.signupForm["password"].touched}
          />*/}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={this.props.loading}
            style={{
              marginTop: "30px",
            }}
          >
            Signup
          </Button>
        </form>
      </Auth>
    );
  }
}

export default Signup;
