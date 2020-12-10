import Auth from "./Auth";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
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
      for (let validator of prevState.SigInForm[input].validators) {
        isValid = isValid && validator(value);
      }
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
        >
          <Input
            id="email"
            label="E-mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "email")}
            value={this.state.SigInForm.email.value}
            valid={this.state.SigInForm["email"].valid}
            touched={this.state.SigInForm["email"].touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, "password")}
            value={this.state.SigInForm.password.value}
            valid={this.state.SigInForm["password"].valid}
            touched={this.state.SigInForm["password"].touched}
          />
          <Button design="raised" type="submit" loading={this.props.loading}>
            Envoyer
          </Button>
        </form>
      </Auth>
    );
  }
}
export default Signin;
