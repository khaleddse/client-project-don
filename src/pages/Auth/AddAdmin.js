import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { addAdmin } from "../../services/admin-service";
import { AddAdminSchema } from "../../pages/util/schema";
import validate from "validate.js";
import AppBarMur from "../../components/AppBar/AppBarMur";
import Footer from "../../components/Footer/Footer";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "91vh",
    backgroundImage:
      "url(https://www.teahub.io/photos/full/21-211580_stunning-white-polygon-wallpaper-images-for-free-download.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  form: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: "50px auto",
  },
  avatar: {
    margin: " auto",
    backgroundColor: theme.palette.secondary.main,
  },
  image: {
    backgroundImage:
      "url(https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/admin-app-management-hero%402x.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formHead: {
    textAlign: "center",
  },
}));
const AddAdmin = () => {
  const classes = useStyles();
  let history = useHistory();

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
      grade: "",
    },
    isValid: false,
    error: {},
    touched: {},
    isAuth: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, AddAdminSchema);
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
    const { nom, prenom, email, password, tel, grade } = formState.values;
    const signupData = {
      nom,
      prenom,
      tel,
      email,
      password,
      grade,
    };
    setisLoading(true);

    const response = await addAdmin(signupData);
    if (response) {
      history.push("/AdminList");
    } else {
      setSignupFailed(true);
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

  const hasError = (field) =>
    formState.touched[field] && formState.error[field] ? true : false;

  return (
    <div>
      <AppBarMur />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          square
          className={classes.gridForm}
        >
          <form className={classes.form}>
            <div className={classes.formHead}>
              <Avatar className={classes.avatar}>
                <AssignmentIndIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Ajouter Admin
              </Typography>
            </div>
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
              helperText={
                hasError("password") ? formState.error.password[0] : null
              }
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
            <FormControl error={hasError("grade")}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Grade
              </InputLabel>
              <Select
                native
                label="Grade"
                inputProps={{
                  name: "grade",
                  id: "outlined-age-native-simple",
                }}
                value={formState.values.grade}
                onChange={inputChangeHandler}
              >
                <option aria-label="None" value="" />
                <option value="admin-principale">Admin Principale</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
            {/*<Button > </Button>*/}
            {SignupFailedState && (
              <Alert severity="error">E-mail existant!</Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={(e) => onSignupHandler(e)}
              disabled={isLoading || !formState.isValid || !isValidPassword()}
              style={{
                marginTop: "30px",
              }}
            >
              Ajouter Admin
            </Button>

            {isLoading && <LinearProgress color="primary" />}
          </form>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default AddAdmin;
