import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import { getPosts } from "../../services/posts";
import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../AnnouncementsList/AnnoucementsList.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
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
const AnnouncementsList = () => {
  const { isAuth, announcementscontexte, setAnnonceHandler } = useContext(
    DonContext
  );
  const classes = useStyles();
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
  const selectedCateg = async (id) => {
    setIsLoading(true);
    const result = announcementscontexte.filter((annonce) => {
      if (annonce.subcategid === id) {
        return annonce;
      }
    });
    setAnnouncements(result);
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
  let i=1;
  const regex = new RegExp(text.search, "i");
  return (
    <div>
      <AppBarMur
        filterHandler={FilterChangeHandler}
        selectedCateg={selectedCateg}
      />
      <div className="flex-container">
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
                <AnnouncementCard
                  key={i++}
                  id={_id}
                  objet={objet}
                  detail={detail}
                  createdAt={createdAt}
                  telephone={telephone}
                  user={user.nom + " " + user.prenom}
                  image={image}
                  adresse={adresse}
                />
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
              <AnnouncementCard
                key={i++}
                id={_id}
                objet={objet}
                detail={detail}
                createdAt={createdAt}
                telephone={telephone}
                user={user.nom + " " + user.prenom}
                image={image}
                adresse={adresse}
              />
            )
          )
        ) : (
          <div className="img-container">
          <h1>Oops!</h1>
          <img height="280" width="300" src="https://cdn.dribbble.com/users/1365063/screenshots/3979985/na_vrhova__plocha_1.png"/>
         <h2>Aucune annonce trouvée !</h2>
         </div>
        )}
        <Fab color="secondary" className={classes.fab} onClick={Auth}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default AnnouncementsList;
