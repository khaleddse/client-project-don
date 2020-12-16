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
            if (regex.test(annonces.name)) {
              return annonces;
            }
          })
          .map(({ id, name, title, image, created }) => (
            <span>
              <AnnouncementCard
                key={id}
                name={name}
                title={title}
                image={image}
                created={created}
              />
            </span>
          ))
      ) : announcements.length > 0 ? (
        announcements.map(({ id, name, title, image, created }) => (
          <span>
            <AnnouncementCard
              key={id}
              name={name}
              title={title}
              image={image}
              created={created}
            />
          </span>
        ))
      ) : (
        <h1>No announcments found</h1>
      )}
    </div>
  );
};

export default AnnouncementsList;
