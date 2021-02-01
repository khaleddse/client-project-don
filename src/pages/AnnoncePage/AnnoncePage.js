import React, { useEffect, useState, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getPostByid } from "../../services/posts";
import AppBarMur from "../../components/AppBar/AppBarMur";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },

  image: {
    width: "100%",
    maxHeight: "80vh",
    textAlign: "center",
  },
  infoContainer: {
    backgroundImage:
      "url(https://image.freepik.com/free-vector/watercolor-background-white-blue_1035-6040.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  Imagecontainer: {
    padding: "2%",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 2),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  header: {
    alignContent: "center",
    alignSelf: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SignInSide(props) {
  const { announcementscontexte } = useContext(DonContext);
  const [annonceState, setannonceState] = useState({
    image: "",
    user: {
      nom: " ",
      prenom: " ",
    },
    detail: "",
    objet: "",
    createdAt: "",
    adresse: "",
    telephone: "",
  });
  const [isLoading, setisLoading] = useState(false);
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const id = new URLSearchParams(props.location.search).get("_id");
    GetPostHandler(id);
  }, []);

  const GetPostHandler = async (id) => {
    setisLoading(true);
    const result = await getPostByid(id);
    const {
      image,
      user,
      detail,
      objet,
      createdAt,
      adresse,
      telephone,
    } = result.annonce;
    if (result) {
      setannonceState({
        image,
        user,
        detail,
        objet,
        createdAt,
        adresse,
        telephone,
      });
    } else {
      history.push("/");
    }
    setisLoading(true);
  };

  return (
    <div>
      <AppBarMur />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.Imagecontainer}>
        { annonceState.image ? 
          <img className={classes.image} src={annonceState.image} />
        :<img className={classes.image} src="https://www.radiobeton.com/www/wp-content/uploads/2017/01/arton17969.jpg"/>}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.infoContainer}
        >
          <div className={classes.paper}>
            <CardHeader
              className={classes.header}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {annonceState.user.nom[0]}
                </Avatar>
              }
              title={annonceState.user.nom + " " + annonceState.user.prenom}
              subheader={
                annonceState.createdAt.slice(11, 16) +
                " le " +
                annonceState.createdAt.slice(0, 10)
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                color="textSecondary"
                variant="h5"
                component="h2"
              >
                <b>Titre &nbsp;&nbsp; &nbsp;&nbsp;: </b>
                {annonceState.objet}
                <hr />
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
                component="h2"
              >
                <b>Détails&nbsp; : </b>
              </Typography>
              <Typography variant="body2" component="p">
                &nbsp;&nbsp;{"  • "}
                {annonceState.detail}
              </Typography>
            </CardContent>
            <CardContent>
              <hr />
              <Typography component="h1"></Typography>
              <Typography color="textSecondary" variant="h5" component="h2">
                <b>Contact :</b>
              </Typography>
              <Typography paragraph>
                &nbsp;&nbsp;
                <RoomOutlinedIcon style={{ fontSize: 15 }} /> :{" "}
                {annonceState.adresse} <br />
                &nbsp;&nbsp;
                <CallOutlinedIcon style={{ fontSize: 15 }} /> :{" "}
                {annonceState.telephone}
                <hr />
              </Typography>
            </CardContent>
            <h4 className={classes.header} style={{ color: "grey" }}>
              {" "}
              Contenu indésirable ?
              <Link to="/contactus">&nbsp;contacter nous .</Link>
            </h4>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
