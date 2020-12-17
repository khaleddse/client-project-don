import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";

const AnnouncementsList = () => {
  useEffect(() => {
    getAllposts();
  }, []);

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllposts = async () => {
    setIsLoading(true);
    const result = await getPosts();
    console.log("result=",result)
    setAnnouncements(result);
    setIsLoading(false);
  };

  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);
    console.log(value.trim().length);
    console.log(isfiltred);
    setText({ search: value });
  };
  console.log(text.search + "  text");
  const regex = new RegExp(text.search, "i");
  return (
    <div>
      <AppBarMur filterHandler={FilterChangeHandler} />
      {isLoading ? (
        <Spinner />
      ) : isfiltred ? (
        announcements
          .filter((annonces) => {
            if (regex.test(annonces.objet)) {
              return annonces;
            }
          })
          .map(({ id,objet, detail, image, adresse,createdAt,telephone ,user}) => {
            const imagefromApi= Buffer.from(
              image.data,
              "binary"
            ).toString("base64");
            const imageSrc="data:image/png;base64," + imagefromApi;


            return(<span>
              <br/>
              <AnnouncementCard
                key={id}
                objet={objet}
                detail={detail}
                createdAt={createdAt}
                telephone={telephone}
                user={user}
                image={imageSrc}
                adresse={adresse}
              />
            </span>)
          })
      ) : announcements.length > 0 ? (
        announcements.map(({ id,objet, detail, image, adresse, createdAt,telephone ,user}) => {
          const imagefromApi= Buffer.from(
            image.data,
            "binary"
          ).toString("base64");
          const imageSrc="data:image/png;base64," + imagefromApi;


          return(<span><br/>
            <AnnouncementCard
              key={id}
              objet={objet}
              detail={detail}
              createdAt={createdAt}
              telephone={telephone}
              user={user}
              image={imageSrc}
              adresse={adresse}
            />          </span>)
        })
      ) : (
        <h1>No announcments found</h1>
      )}
    </div>
  );
};

export default AnnouncementsList;
