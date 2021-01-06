import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import validate from "validate.js";import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from '@material-ui/core/Checkbox';
import Alert from "@material-ui/lab/Alert";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "../../components/AppBar/AppBar";
import { signInHandler } from "../../services/auth-service";
import { signInSchema } from "../util/schema";
import { Link, useHistory } from "react-router-dom";
import decode from "jwt-decode";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        NajemN3awen
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '91vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,water)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const classes = useStyles();
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
    <div>
      <AppBar/>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Se connecter
          </Typography>
          <form className={classes.form}  onSubmit={(e) => submitFormHandler(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              id="email"
          name="email"
          label="E-mail"
          error={hasError("email")}
          helperText={hasError("email") ? formState.errors.email[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth

              type="password"
              
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading || !formState.isValid}
              className={classes.submit}
            >
              Se connecter
            </Button>
            {isLoading && <LinearProgress  color="primary" />}
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Vous n’avez pas de compte ? Creé un"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}
/*import { useState, useEffect, useContext } from "react";
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

export default Signin;*/
