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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6%",
    marginBottom: "4.5%",
  },
  image: {
    textAlign:"center",
    backgroundColor:"#495C6A"
  },
  formGrid: {
    backgroundColor:"white",

  },
  form: {
    width: "90%",
    marginLeft:"auto",
    marginRight:"auto",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10%",
    marginTop: "4%",
  },
}));

const ContactUs = () => {
  const classes = useStyles();
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
    const { email, detail } = formState.values;
    const response = await AddAvis({ email, detail });
    if (response) {
      console.log(response);
      if (response.status === 200) {
        setIsSucceed(true);
      }
    }
    setFormState((formState) => ({
      values: {
        email: "",
        detail: "",
      },
      isValid: false,
      touched: {},
      errors: {},
    }));
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
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <AppBarMur />
      <CssBaseline />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={2} />
        <Grid item xs={false} sm={3} className={classes.image} >
          <br/>
          <img style={{marginRight:"auto",marginLeft:"auto",display:"block"}} height="200"src="https://riskcontrolacademy.com/wp-content/uploads/2018/02/contact.png"/>
          <h3 style={{margin:"10px 30px",color:"white"}}>si vous avez des questions ou souhaitez simplement nous contacter,n'hésitez pas de remplir la formuliare.</h3>
          <h4 style={{marginBottom:"0px",color:"#A2BCE0"}} > Télephone : +216 28 437 349</h4>
          <h4 style={{marginBottom:"0px ",color:"#A2BCE0"}}>E-mail : contact@NajemN3awen.tn</h4>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.formGrid} square><br/>
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              height: "100px",
            }}
            src="https://desl-art.com/wp-content/uploads/2019/03/contact-bouton-1.png"
          />
          <form onSubmit={(e) => submitFormHandler(e)} className={classes.form}>
            <TextField
            style={{backgroundColor:"#f2f2f2"}}
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
                        style={{backgroundColor:"#f2f2f2"}}

              value={formState.values.detail}
              onChange={inputChangeHandler}
              id="detail"
              name="detail"
              error={hasError("detail")}
              helperText={
                hasError("detail") ? formState.errors.detail[0] : null
              }
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
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      <Footer />
    </div>
  );
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default ContactUs;
