import { useState, useEffect } from "react";
import { getPosts,getPostsBySubCateg } from "../../services/posts";
import AnnouncementCard from "../../components/UI/AnnouncementCard/AnnouncementCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import AppBarMur from "../../components/AppBar/AppBarMur";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "../AnnouncementsList/AnnoucementsList.css";
const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper,
    },
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },

}));
const AnnouncementsList = () => {
  const classes = useStyles();
  useEffect(() => {
    getAllposts();
  }, []);
  let history=useHistory();


  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllposts = async () => {
    setIsLoading(true);
    const result = await getPosts();
    //get annnonces by ordre (date)
    setAnnouncements(result.reverse());
    setIsLoading(false);
  };
  //let history=useHistory();
 
  const [isfiltred, setIsFiltred] = useState(false);

  const [text, setText] = useState({ search: "" });
  const selectedCateg =async(id)=>{
    setIsLoading(true)
    const result= await getPostsBySubCateg(id);
    setAnnouncements(result.reverse())
    setIsLoading(false)
  }

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
      <AppBarMur filterHandler={FilterChangeHandler} selectedCateg={selectedCateg} />
      <div  className="flex-container">
      {isLoading ? (
        <div><Spinner  ></Spinner></div>
      ) : isfiltred ? (
        announcements
          .filter((annonces) => {
            if (regex.test(annonces.objet)) {
              return annonces;
            }else{
              return null
            }
          })
          .map(({ id,objet, detail, image, adresse,createdAt,telephone ,user}) => {
            const imageSrc= image


            return(
              
              <AnnouncementCard
                id={id}
                objet={objet}
                detail={detail}
                createdAt={createdAt}
                telephone={telephone}
                user={user}
                image={imageSrc}
                adresse={adresse}
              />
           )
          })
      ) : announcements.length > 0 ? (
        announcements.map(({ id,objet, detail, image, adresse, createdAt,telephone ,user}) => {

          const imageSrc=image


          return(
            <AnnouncementCard
              id={id}
              objet={objet}
              detail={detail}
              createdAt={createdAt}
              telephone={telephone}
              user={user}
              image={imageSrc}
              adresse={adresse}
            />         )
        })
      ) : (
        <h1>No announcments found</h1>
      )}
      <Fab color="secondary" className={classes.fab} onClick={IsAuth}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default AnnouncementsList;
