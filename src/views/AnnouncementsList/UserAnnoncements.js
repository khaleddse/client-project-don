import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import "../AnnouncementsList/AnnoucementsList.css";
import Button from "@material-ui/core/Button";
import { Link} from "react-router-dom";
const UserAnnouncements = () => {
  useEffect(() => {
    getAnnoncebyUser();
  }, []);

  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  const regex = new RegExp(text.search, "i");

  const { user, isAuth, announcementscontexte } = useContext(
    DonContext
  );

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

  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);

    setText({ search: value });
  };
let i=1;
  return (
    <div>
      <AppBarMur
        filterHandler={FilterChangeHandler}
      />
      <div className="flex-container">
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
          <img alt="notFound" height="280" width="300" src="https://rivasdev.tech/assets/img/no-data-found.png"/>
         <h2>Vous avez aucune annonce !</h2>
         {
              <Link to="/AjoutAnnonce">
                <Button color="inherit">Créer une</Button>
              </Link>
            }
         </div>
        )}
      </div>
    </div>
  );
};
export default UserAnnouncements;
