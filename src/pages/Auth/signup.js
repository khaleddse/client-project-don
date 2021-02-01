import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { signupHandler } from "../../services/auth-service";
import { signUpSchema } from "../../pages/util/schema";
import validate from "validate.js";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";

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
    backgroundImage: "url(https://source.unsplash.com/1600x900/?nature,water)",
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
const Signup = () => {
  const classes = useStyles();
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
      history.push("/signin");
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
    <div>
      <AppBar />
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
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Rejoignez-nous
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
            {/*<Button > </Button>*/}
            {SignupFailedState && (
              <Alert severity="error">E-mail existant!</Alert>
            )}

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
              scroll={"body"}
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
                  <p>Si, par principe, l&rsquo;obligation est r&eacute;put&eacute;e exister d&egrave;s l&rsquo;&eacute;change des consentements, les parties peuvent subordonner sa cr&eacute;ation ou sa disparition &agrave; la r&eacute;alisation d&rsquo;un &eacute;v&eacute;nement dont elles d&eacute;terminent la teneur lors de la conclusion du contrat.</p>
<p>Cette modalit&eacute; de l&rsquo;obligation qui est susceptible d&rsquo;affecter son existence est qualifi&eacute;e de condition.</p>
<p>Introduit par l&rsquo;ordonnance du 10 f&eacute;vrier 2016, le nouvel&nbsp;<u>article 1304</u>&nbsp;du Code civil pr&eacute;voit que &laquo;&nbsp;<em>l&rsquo;obligation est conditionnelle lorsqu&rsquo;elle d&eacute;pend d&rsquo;un &eacute;v&eacute;nement futur et incertain</em>.&nbsp;&raquo;</p>
<p>La condition fait ainsi d&eacute;pendre l&rsquo;existence de l&rsquo;obligation d&rsquo;un &eacute;v&eacute;nement dont la r&eacute;alisation est ind&eacute;pendante de la volont&eacute; des parties (&agrave; tout le moins du d&eacute;biteur).</p>
<p>Classiquement, on distingue deux sortes de conditions&nbsp;: la condition suspensive et la condition r&eacute;solutoire.</p>
<ul>
<li><strong>La condition suspensive</strong>
<ul>
<li>Le nouvel&nbsp;<u>article 1304</u>&nbsp;du Code civil pr&eacute;voit, en son&nbsp;<u>alin&eacute;a 2</u>&nbsp;que &laquo;&nbsp;<em>la condition est suspensive lorsque son accomplissement rend l&rsquo;obligation pure et simple</em>.&nbsp;&raquo;</li>
<li>La condition suspensive est de la sorte celle qui suspend la naissance de l&rsquo;obligation &agrave; la r&eacute;alisation d&rsquo;un &eacute;v&eacute;nement futur et incertain.</li>
<li>Le rapport au Pr&eacute;sident de la R&eacute;publique pr&eacute;cise que &laquo;&nbsp;<em>en pr&eacute;sence d&rsquo;une condition suspensive, la naissance de l&rsquo;obligation est suspendue &agrave; l&rsquo;accomplissement de cette condition : tant que la condition n&rsquo;est pas r&eacute;alis&eacute;e, l&rsquo;obligation conditionnelle n&rsquo;existe qu&rsquo;en germe, seul l&rsquo;accomplissement de la condition rend l&rsquo;obligation pure et simple</em>&raquo;.</li>
<li>Deux hypoth&egrave;ses sont alors envisageables&nbsp;:
<ul>
<li><strong><em>La condition suspensive se r&eacute;alise</em></strong>
<ul>
<li>L&rsquo;obligation est confirm&eacute;e dans sa cr&eacute;ation</li>
<li>D&egrave;s lors, le contrat devient efficace&nbsp;: il peut recevoir ex&eacute;cution</li>
</ul>
</li>
<li><strong><em>La condition suspensive ne se r&eacute;alise pas</em></strong>
<ul>
<li>L&rsquo;obligation est r&eacute;put&eacute;e n&rsquo;avoir jamais exist&eacute;</li>
<li>La cons&eacute;quence en est que si elle constituait un &eacute;l&eacute;ment essentiel du contrat, l&rsquo;acte est frapp&eacute; de caducit&eacute;</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<ul>
<li><strong>La condition r&eacute;solutoire</strong>
<ul>
<li>Le nouvel&nbsp;<u>article 1304</u>&nbsp;du Code civil pr&eacute;voit en son&nbsp;<u>alin&eacute;a 3</u>&nbsp;que la condition &laquo;&nbsp;<em>est r&eacute;solutoire lorsque son accomplissement entra&icirc;ne l&rsquo;an&eacute;antissement de l&rsquo;obligation.</em>&raquo;</li>
<li>Ainsi, la condition r&eacute;solutoire est celle qui, si elle se r&eacute;alise, menace de disparition une obligation qui existe d&eacute;j&agrave;.</li>
<li>Plus pr&eacute;cis&eacute;ment, selon le rapport au Pr&eacute;sident de la R&eacute;publique &laquo;&nbsp;<em>en pr&eacute;sence d&rsquo;une condition r&eacute;solutoire, l&rsquo;obligation na&icirc;t imm&eacute;diatement et produit tous ses effets, mais son an&eacute;antissement est subordonn&eacute; &agrave; l&rsquo;accomplissement de la condition</em>.&nbsp;&raquo;
<ul>
<li><strong><em>Exemple&nbsp;:</em></strong>
<ul>
<li>Les parties pr&eacute;voient que, en cas de nom paiement du loyer &agrave; une &eacute;ch&eacute;ance d&eacute;termin&eacute;e, le bail est r&eacute;sili&eacute; de plein droit</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>La distinction entre la condition suspensive et la condition r&eacute;solutoire tient au fond &agrave; ce que &laquo;&nbsp;<em>dans le premier cas, l&rsquo;obligation est provisoirement inefficace, mais son efficacit&eacute; peut r&eacute;sulter r&eacute;troactivement de la r&eacute;alisation de la condition, tandis que dans le second, elle est provisoirement efficace, mais peut &ecirc;tre r&eacute;troactivement an&eacute;antie si la condition se r&eacute;alise</em>&nbsp;&raquo;<a href="https://aurelienbamde.com/2017/09/03/de-la-distinction-entre-la-condition-et-le-terme/#_ftn1" name="_ftnref1">[1]</a></p>
<p><strong>==&gt;&nbsp;<u>Le terme</u></strong></p>
<p>Initialement, le Code civil ne donnait aucune d&eacute;finition du terme. Lors de la r&eacute;forme des obligations, le l&eacute;gislateur a rem&eacute;di&eacute; &agrave; cette carence en introduisant un nouvel&nbsp;<u>article 1305</u>&nbsp;dans le Code civil</p>
<p>Cette disposition pr&eacute;voit que &laquo;&nbsp;<em>l&rsquo;obligation est &agrave; terme lorsque son exigibilit&eacute; est diff&eacute;r&eacute;e jusqu&rsquo;&agrave; la survenance d&rsquo;un &eacute;v&eacute;nement futur et certain, encore que la date en soit incertaine.</em>&nbsp;&raquo;</p>
<p>Deux enseignements majeurs peuvent &ecirc;tre tir&eacute;s de cette d&eacute;finition&nbsp;:</p>
<ul>
<li><strong>Premier enseignement&nbsp;: une modalit&eacute; temporelle de l&rsquo;obligation</strong>
<ul>
<li>Le terme est une modalit&eacute; de l&rsquo;obligation qui a pour objet d&rsquo;affecter son exigibilit&eacute; ou sa dur&eacute;e
<ul>
<li>Lorsque le terme fait d&eacute;pendre l&rsquo;exigibilit&eacute; de l&rsquo;obligation d&rsquo;un &eacute;v&eacute;nement, on dit que&nbsp;<strong><em>le terme est suspensif</em></strong>
<ul>
<li>Dans cette hypoth&egrave;se, l&rsquo;obligation existe</li>
<li>Toutefois, tant que l&rsquo;&eacute;v&eacute;nement ne s&rsquo;est pas r&eacute;alis&eacute;, le cr&eacute;ancier ne peut pas en r&eacute;clamer l&rsquo;ex&eacute;cution</li>
</ul>
</li>
<li>Lorsque le terme fait d&eacute;pendre la dur&eacute;e de l&rsquo;obligation d&rsquo;un &eacute;v&eacute;nement, on dit que&nbsp;<strong><em>le terme est extinctif</em></strong>
<ul>
<li>Dans cette hypoth&egrave;se, non seulement l&rsquo;obligation existe, mais encore elle est exigible</li>
<li>Il en r&eacute;sulte que tant que l&rsquo;&eacute;v&eacute;nement ne s&rsquo;est pas r&eacute;alis&eacute; le d&eacute;biteur doit l&rsquo;ex&eacute;cuter</li>
<li>Lorsque, en revanche, l&rsquo;&eacute;ch&eacute;ance fix&eacute;e interviendra, l&rsquo;obligation dispara&icirc;tra</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><strong>II)&nbsp;<u>Crit&egrave;res de la distinction</u></strong></p>
<p>La condition se distingue du terme sur deux points&nbsp;:</p>
<ul>
<li><strong>Premier &eacute;l&eacute;ment distinctif&nbsp;: existence / exigibilit&eacute;-dur&eacute;e</strong>
<ul>
<li><strong><em>La condition</em></strong>
<ul>
<li>Elle est une modalit&eacute; de l&rsquo;obligation qui affecte son existence, en ce sens que de sa r&eacute;alisation d&eacute;pend
<ul>
<li>soit sa cr&eacute;ation&nbsp;: la&nbsp;<u>condition est suspensive</u></li>
<li>soit sa disparition&nbsp;: la&nbsp;<u>condition est r&eacute;solutoire</u></li>
</ul>
</li>
</ul>
</li>
<li><strong><em>Le terme</em></strong>
<ul>
<li>Il est une modalit&eacute; de l&rsquo;obligation qui affecte, non pas son existence, mais son exigibilit&eacute; ou sa dur&eacute;e
<ul>
<li><u>Le terme est suspensif</u>&nbsp;lorsqu&rsquo;il affecte l&rsquo;exigibilit&eacute; de l&rsquo;obligation</li>
<li><u>Le terme est extinctif</u>&nbsp;lorsqu&rsquo;il affecte la dur&eacute;e de l&rsquo;obligation</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<ul>
<li><strong>Second &eacute;l&eacute;ment distinctif&nbsp;: l&rsquo;incertitude</strong>
<ul>
<li><strong><em>La condition</em></strong>
<ul>
<li>Elle se rapporte &agrave; un &eacute;v&eacute;nement incertain, en ce sens que sa r&eacute;alisation est ind&eacute;pendante de la volont&eacute; des parties</li>
<li>Ce n&rsquo;est qu&rsquo;en cas de survenance de cet &eacute;v&eacute;nement que l&rsquo;obligation produira ses effets</li>
</ul>
</li>
<li><strong><em>Le terme</em></strong>
<ul>
<li>Il se rapporte &agrave; un &eacute;v&eacute;nement certain, en ce sens que sa survenance n&rsquo;est pas soumise &agrave; un al&eacute;a</li>
<li>Les parties ont la certitude que cet &eacute;v&eacute;nement se produira, soit parce que son &eacute;ch&eacute;ance est d&eacute;termin&eacute;e, soit parce que sa r&eacute;alisation est in&eacute;vitable</li>
</ul>
</li>
</ul>
</li>
</ul>
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
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Signup;
