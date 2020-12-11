import { useState, useEffect } from "react";
import validate from "validate.js";
import Auth from "./Auth";
import TextField from "@material-ui/core/TextField";
import "./Auth.css";
import Button from "@material-ui/core/Button";
import { signInHandler } from "../../services/auth-service";
import { signInSchema } from "../util/schema";

const Signin = () => {
  const [formState, setFormState] = useState({
    isValid: false,
    token: null,
    isAuth: false,
    values: {
      email: "",
      password: "",
    },
    errore: {},
    touched: {},
  });
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, signInSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const inputChangeHandler = (e) => {
    e.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(formState);
    e.preventDefault();

    setisLoading(true);
    const { email, password } = formState.values;
    const response = await signInHandler({
      email,
      password,
    });
    setisLoading(false);
    setFormState((formState) => ({
      ...formState,
      token: response.token,
      isAuth: true,
    }));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Auth>
      <form onSubmit={(e) => submitFormHandler(e)} className="form">
        <TextField
          id="email"
          name="email"
          label="E-mail"
          error={hasError("email")}
          helperText={hasError("email") ? formState.errors.email[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          error={hasError("password")}
          helperText={
            hasError("password") ? formState.errors.password[0] : null
          }
          onChange={inputChangeHandler}
          value={formState.values.password}
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginTop: "30px",
          }}
          disabled={isLoading || !formState.isValid}
        >
          Se connecter
        </Button>
      </form>
    </Auth>
  );
};

export default Signin;
