import React, { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import { getPosts } from "../../services/posts";
import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useHistory } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../AnnouncementsList/AnnoucementsList.css";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage:
      "url(https://www.pixelstalk.net/wp-content/uploads/2015/01/Snow-winter-landscape-wallpaper-widescreen.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "0px -350px",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  main: {
    backgroundColor: "#f2f2f2",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: "#3f51b5",
    padding: theme.spacing(2),
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function AnnouncementsList() {
  const classes = useStyles();
  const { isAuth, announcementscontexte, setAnnonceHandler } = useContext(
    DonContext
  );
  useEffect(() => {
    getAllposts();
  }, []);
  let history = useHistory();

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllposts = async () => {
    setIsLoading(true);
    const result = await getPosts();
    setAnnonceHandler(result);
    setAnnouncements(result.reverse());
    setIsLoading(false);
  };

  const [isfiltred, setIsFiltred] = useState(false);

  const [text, setText] = useState({ search: "" });
  const selectedCateg = async (id, type) => {
    setIsLoading(true);
    if (type === "subcateg") {
      const result = announcementscontexte.filter((annonce) => {
        if (annonce.subcategid === id) {
          return annonce;
        }
      });
      setAnnouncements(result);
    } else if (type === "all") {
      setAnnouncements(announcementscontexte);
    }
    setIsLoading(false);
  };

  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);

    setText({ search: value });
  };

  const Auth = () => {
    if (isAuth) {
      history.push("/AjoutAnnonce");
    } else {
      history.push("/signin");
    }
  };
  let i = 1;
  const regex = new RegExp(text.search, "i");
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarMur
        filterHandler={FilterChangeHandler}
        selectedCateg={selectedCateg}
      />
      <main className={classes.main}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Bienvenue
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              <b>
                Vous avez quelques choses qui vou n'avez plus besoins,vous ne
                voulez pas le jeté en dehors?
                <br />
                vos gadgets inutiles sont utiles pour quelqun d'autre ,Faites
                les un don ici en quelques clics !
              </b>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={Auth}>
                    Créer une annonce
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push("contactus")}
                  >
                    Contacter nous
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {isLoading ? (
              <div className="img-container">
                <Spinner />
                <h2>Chargement...</h2>
              </div>
            ) : isfiltred ? (
              announcements
                .filter((annonces) => {
                  if (regex.test(annonces.objet)) {
                    return annonces;
                  } else {
                    return null;
                  }
                })
                .map(
                  ({
                    _id,
                    objet,
                    detail,
                    image,
                    adresse,
                    createdAt,
                    telephone,
                    user,
                  }) => (
                    <Grid item key={i++} xs={12} sm={6} md={4}>
                      <AnnouncementCard
                        key={_id}
                        id={_id}
                        objet={objet}
                        detail={detail}
                        createdAt={createdAt}
                        telephone={telephone}
                        user={user.nom + " " + user.prenom}
                        image={image}
                        adresse={adresse}
                      />
                    </Grid>
                  )
                )
            ) : announcements.length > 0 ? (
              announcements.map(
                ({
                  _id,
                  objet,
                  detail,
                  image,
                  adresse,
                  createdAt,
                  telephone,
                  user,
                }) => (
                  <Grid item key={i++} xs={12} sm={6} md={4}>
                    <AnnouncementCard
                      key={_id}
                      id={_id}
                      objet={objet}
                      detail={detail}
                      createdAt={createdAt}
                      telephone={telephone}
                      user={user.nom + " " + user.prenom}
                      image={image}
                      adresse={adresse}
                    />
                  </Grid>
                )
              )
            ) : (
              <div className="img-container">
                <h1>Oops!</h1>
                <img
                  height="280"
                  width="300"
                  src="https://rivasdev.tech/assets/img/no-data-found.png"
                />
                <h2>Aucune annonce trouvée !</h2>
              </div>
            )}
          </Grid>
          <Fab color="secondary" className={classes.fab} onClick={Auth}>
            <AddIcon />
          </Fab>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
