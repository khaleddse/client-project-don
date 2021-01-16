import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import AppBarMur from "../../components/AppBar/AppBarMur";
import React,{ useState, useEffect, useContext } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { DonContext } from "../../contexte/donContexte";
import { makeStyles } from '@material-ui/core/styles';
import "../AnnouncementsList/AnnoucementsList.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { deltePost } from "../../services/posts";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: 'url(https://wsss.org.nz/wp-content/uploads/2020/05/tips-writing-attendance-boosting-elearning-event-announcement.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  main:{
    backgroundColor:"#f2f2f2",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}))

const UserAnnouncements = (props) => {
  const classes = useStyles();

  useEffect(() => {
    getAnnoncebyUser();
  }, []);

  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  const regex = new RegExp(text.search, "i");

  const { user, isAuth, announcementscontexte } = useContext(DonContext);

  const [announcements, setAnnouncements] = useState([]);

  const getAnnoncebyUser = () => {
    if (isAuth) {
      const Rst = announcementscontexte.filter((annonce) => {
        if (annonce.user._id === user.userId) {
          return annonce;
        }
      });
      setAnnouncements(Rst);
    }
  };
  const deleteannonces = async (id) => {
    if (window.confirm("Êtes vous sûr de supprimer cet annonce ?")) {
    await deltePost(id);
    const Rst = announcements.filter((annonce) => {
      if (annonce._id !== id) {
        return annonce;
      }
    });

    setAnnouncements(Rst);
  }
  };
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);

    setText({ search: value });
  };
  let i = 1;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBarMur filterHandler={FilterChangeHandler} />
      <main className={classes.main}>
      <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Votres Annonces 
            </Typography>          
          </Container>
        </div>
      <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {isfiltred ? (
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
                  key={i++}
                  id={_id}
                  deleteannonce={() => deleteannonces(_id)}
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
                key={i++}
                id={_id}
                deleteannonce={() => deleteannonces(_id)}
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
              alt="notFound"
              height="280"
              width="300"
              src="https://rivasdev.tech/assets/img/no-data-found.png"
            />
            <h2>Vous avez aucune annonce !</h2>
            {
              <Link to="/AjoutAnnonce">
                <Button color="inherit">Créer une</Button>
              </Link>
            }
          </div>
        )}
        </Grid>
        </Container>
        </main>
        <Footer/>
        </React.Fragment>
  );
};
export default UserAnnouncements;
