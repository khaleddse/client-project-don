import { useState, useEffect } from "react";
import validate from "validate.js";
import AppBarMur from "../../components/AppBar/AppBarMur";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import "./LoggedIn.css";
import { ContactUsSchema } from "../util/schema";
import { AddAvis } from "../../services/avis";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../../components/Footer/Footer";
const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      email: "",
      detail: "",
    },
    isValid: false,
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, ContactUsSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("values:", formState.values);
    const { email, detail } = formState.values;
    const response = await AddAvis({ email, detail });
    if (response) {
      console.log(response);
      if (response.status === 200) {
        setIsSucceed(true);
      }
    }
    setIsLoading(false);
  };
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSucceed(false);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div>
    <AppBarMur/>
      <CssBaseline/>

      <form onSubmit={(e) => submitFormHandler(e)} className="form">
        <TextField
          variant="outlined"
          id="email"
          name="email"
          label="E-mail"
          error={hasError("email")}
          helperText={hasError("email") ? formState.errors.email[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.email}
        />
        <br />
        <TextField
          value={formState.values.detail}
          onChange={inputChangeHandler}
          id="detail"
          name="detail"
          error={hasError("detail")}
          helperText={hasError("detail") ? formState.errors.detail[0] : null}
          label="Exprimez Vous"
          multiline
          rows={4}
          variant="outlined"
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
          Envoyer
        </Button>
        {isLoading && <LinearProgress color="primary" />}
        <Snackbar
          open={isSucceed}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Merci, votre message a bien été envoyé !
          </Alert>
        </Snackbar>
      </form>
      <Footer/>
      </div>
  );
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default ContactUs;
