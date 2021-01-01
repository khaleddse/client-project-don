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
      alert(" pour ajouter une annonce il faut connctée ");
      history.push("/signin");
    }
  };
  const regex = new RegExp(text.search, "i");
  return (
    <div>
      <AppBarMur
        filterHandler={FilterChangeHandler}
        selectedCateg={selectedCateg}
      />
      <div className="flex-container">
        {isLoading ? (
          <div>
            <Spinner />
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
            )
          )
        ) : (
          <h1>No announcments found</h1>
        )}
        <Fab color="secondary" className={classes.fab} onClick={Auth}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default AnnouncementsList;
