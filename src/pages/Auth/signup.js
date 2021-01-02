import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Auth from "./Auth";
import "./Auth.css";
import { signupHandler } from "../../services/auth-service";
import { signUpSchema } from "../../pages/util/schema";
import validate from "validate.js";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Signup = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [SignupFailedState, setSignupFailed] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      tel: "",
      confirmpassword: "",
    },
    isValid: false,
    error: {},
    touched: {},
    isAuth: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, signUpSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      error: errors || {},
    }));
  }, [formState.values]);

  const inputChangeHandler = (e) => {
    e.target.name === "email" && setSignupFailed(false);
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
  const onSignupHandler = async (e) => {
    e.preventDefault();
    const { nom, prenom, email, password, tel } = formState.values;
    const signupData = {
      nom,
      prenom,
      tel,
      email,
      password,
    };
    setisLoading(true);

    const response = await signupHandler(signupData);
    if (response) {
      history.push("/sigin");
    } else {
      setSignupFailed(true);
      setOpen(false);
    }
    setisLoading(false);
  };
  const isValidPassword = () => {
    return formState.touched["confirmpassword"]
      ? formState.values.password === formState.values.confirmpassword
        ? true
        : false
      : true;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.error[field] ? true : false;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Auth>
      <form className="form">
        <TextField
          id="nom"
          name="nom"
          label="Nom"
          onChange={inputChangeHandler}
          value={formState.values.nom}
          error={hasError("nom")}
          helperText={hasError("nom") ? formState.error.nom[0] : null}
        />
        <TextField
          id="prenom"
          name="prenom"
          label="Prenom"
          onChange={inputChangeHandler}
          value={formState.values.prenom}
          error={hasError("prenom")}
          helperText={hasError("prenom") ? formState.error.prenom[0] : null}
        />
        <TextField
          id="tel"
          name="tel"
          label="Numéro de mobile"
          onChange={inputChangeHandler}
          value={formState.values.tel}
          error={hasError("tel")}
          helperText={hasError("tel") ? formState.error.tel[0] : null}
        />
        <TextField
          id="email"
          name="email"
          label="E-Mail"
          type="email"
          onChange={inputChangeHandler}
          value={formState.values.email}
          error={hasError("email")}
          helperText={hasError("email") ? formState.error.email[0] : null}
        />
        <TextField
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          onChange={inputChangeHandler}
          value={formState.values.password}
          error={hasError("password")}
          helperText={hasError("password") ? formState.error.password[0] : null}
        />
        <TextField
          id="confirmpassword"
          name="confirmpassword"
          label="Confirmer Mot de passe"
          type="password"
          onChange={inputChangeHandler}
          value={formState.values.confirmpassword}
          error={hasError("confirmpassword") || !isValidPassword()}
          helperText={
            hasError("confirmpassword")
              ? formState.error.confirmpassword[0]
              : isValidPassword()
              ? null
              : "valeur n'est pas identique"
          }
        />
        {/*<Button > </Button>*/}
        {SignupFailedState && <Alert severity="error">E-mail existant!</Alert>}

        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={isLoading || !formState.isValid || !isValidPassword()}
          style={{
            marginTop: "30px",
          }}
        >
          S'inscrire
        </Button>
        <h3 style={{ textAlign: "center", color: "dimgrey" }}>
          Vous avez une compte?
          <Link to="/signin">
            <Button color="inherit">ME CONNECTER</Button>
          </Link>
        </h3>
        {isLoading && <LinearProgress color="primary" />}

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Termes d'utilisation
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                )
                .join("\n")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button color="primary" onClick={(e) => onSignupHandler(e)}>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Auth>
  );
};

export default Signup;
