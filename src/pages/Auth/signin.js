import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import validate from "validate.js";
import Auth from "./Auth";
import TextField from "@material-ui/core/TextField";
import "./Auth.css";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import { signInHandler } from "../../services/auth-service";
import { signInSchema } from "../util/schema";
import { Link, useHistory } from "react-router-dom";
import decode from "jwt-decode";

const Signin = () => {
  const { setAuthHandler, setUserHandler } = useContext(DonContext);
  const [SignupFailedState, setSignupFailed] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
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
    setSignupFailed(false);
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
  let history = useHistory();
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const { email, password } = formState.values;
    try {
      const { token } = await signInHandler({
        email,
        password,
      });
      setAuthHandler(true);
      setUserHandler(decode(token));

      
      history.push("/announcements");
    } catch (error) {
      setSignupFailed(true);
    }
    setisLoading(false);
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
          label="Mot de passe"
          error={hasError("password")}
          helperText={
            hasError("password") ? formState.errors.password[0] : null
          }
          onChange={inputChangeHandler}
          value={formState.values.password}
          type="password"
        />
        {SignupFailedState && (
          <Alert severity="error">E-mail où mot de passe incorrect !</Alert>
        )}
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
        <p>
          <h3 style={{textAlign:  "center",color:"dimgrey"}}>
            Vous n’avez pas de compte ?
            {
              <Link to="/signup">
                <Button color="inherit">CRÉER MON COMPTE</Button>
              </Link>
            }
          </h3>{" "}
        </p>
        {isLoading && <LinearProgress color="primary" />}
      </form>
    </Auth>
  );
};

export default Signin;
