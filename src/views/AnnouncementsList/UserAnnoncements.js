import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";

const UserAnnouncements = () => {
  useEffect(() => {
    getAnnoncebyUser();
  }, []);

  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  const regex = new RegExp(text.search, "i");

  const { user, isAuth, announcementscontexte, setAnnonceHandler } = useContext(
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

  return (
    <div>
      <AppBarMur
        filterHandler={FilterChangeHandler}
        // selectedCateg={selectedCateg}
      />
      <div className="flex-container">
        {/*isLoading ? (
          <div>
            <Spinner />
          </div>*/}
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
      </div>
    </div>
  );
};
export default UserAnnouncements;
