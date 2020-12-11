import Auth from "./Auth";
import Input from "../../components/Form/Input/Input";
import TextField from "@material-ui/core/TextField";
import "./signin.css";
//import Button from "../../components/Button/Button";
import Button from "@material-ui/core/Button";
import { required, length, email } from "../util/validators";
const { Component } = require("react");

class Signin extends Component {
  state = {
    SigInForm: {
      email: {
        value: "",
        valid: false,
        required: true,
        validators: [email, required],
      },
      password: {
        value: "",
        valid: false,
        required: true,
        validators: [required, length({ min: 5 })],
      },
    },
    formIsValid: false,
  };
  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      /* for (let validator of prevState.SigInForm[input].validators) {
        isValid = isValid && validator(value);
      } */
      const updatedForm = {
        ...prevState.SigInForm,
        [input]: {
          ...prevState.SigInForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (let element in updatedForm) {
        formIsValid = formIsValid && updatedForm[element].valid;
      }
      return {
        SigInForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };
  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        SigInForm: {
          ...prevState.SigInForm,
          [input]: {
            ...prevState.SigInForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    return (
      <Auth>
        <form
          onSubmit={(e) =>
            this.props.onSignin(e, {
              email: this.state.SigInForm.email.value,
              password: this.state.SigInForm.password.value,
            })
          }
          className="form"
        >
          <TextField
            id="email"
            label="E-mail"
            onChange={(e) => this.inputChangeHandler("email", e.target.value)}
            value={this.state.SigInForm.email.value || ""}
          />
          <TextField
            id="password"
            label="Password"
            onChange={(e) =>
              this.inputChangeHandler("password", e.target.value)
            }
            value={this.state.SigInForm.password.value || ""}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={this.props.loading}
            style={{
              marginTop: "30px",
            }}
          >
            Primary
          </Button>
        </form>
      </Auth>
    );
  }
}
export default Signin;
