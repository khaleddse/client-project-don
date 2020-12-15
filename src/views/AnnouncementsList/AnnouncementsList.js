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
  return (
    <div>
      <AppBarMur />
      {isLoading ? (
        <Spinner />
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
