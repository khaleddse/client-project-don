import Auth from "../Auth/Auth";
import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required } from "../util/validators";

const { Component } = require("react");

class AddAnonce extends Component {
  state = {
    annonceForme: {
      objet: {
        value: "",
        valid: false,
        required: true,
        validators: [required],
      },
      detail: {
        value: "",
        valid: false,
        required: true,
        validators: [required],
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      for (let validator of prevState.annonceForme[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.annonceForme,
        [input]: {
          ...prevState.annonceForme[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (let element in updatedForm) {
        formIsValid = formIsValid && updatedForm[element].valid;
      }
      return {
        annonceForme: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  render() {
    return (
      <Auth>
        <form onSubmit={(e) => this.props.onSubmitAnnonce(e, this.state)}>
          <Input
            id="objet"
            label="Object"
            type="text"
            control="input"
            value={this.state.annonceForme.objet.value}
            required={this.state.annonceForme.objet.required}
            onChange={this.inputChangeHandler}
          />
          <Input
            id="detail"
            label="Detail"
            type="text"
            control="textarea"
            rows="7"
            value={this.state.annonceForme.detail.value}
            required={this.state.annonceForme.detail.required}
            onChange={this.inputChangeHandler}
          />
          <Button design="raised" type="submit" loading={this.props.loading}>
            Envoyer
          </Button>
        </form>
      </Auth>
    );
  }
}
export default AddAnonce;
