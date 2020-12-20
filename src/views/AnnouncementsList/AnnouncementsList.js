import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useHistory } from "react-router-dom";


const AnnouncementsList = () => {
  useEffect(() => {
    getAllposts();
  }, []);
  let history=useHistory();
  const logoutChangeHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('success');
    history.push("/")
  }

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllposts = async () => {
    setIsLoading(true);
    const result = await getPosts();
    console.log("result=",result)
    setAnnouncements(result);
    setIsLoading(false);
  };
  //let history=useHistory();
 
  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);
    console.log(value.trim().length);
    console.log(isfiltred);
    setText({ search: value });
  };
  const IsAuth =()=>{
    const succes = localStorage.getItem('success') ;
    if (succes=== 'true'){
      history.push("/AjoutAnnonce")
    }else{
      alert(" pour ajouter une annonce il faut connctée ");
      setTimeout(history.push("/"),500);
    }
    
  }
  console.log(text.search + "  text");
  const regex = new RegExp(text.search, "i");
  return (
    <div>
      <AppBarMur filterHandler={FilterChangeHandler} logoutHandler={logoutChangeHandler} Authorization={IsAuth}/>
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
            const imageSrc= image


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

          const imageSrc=image


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
