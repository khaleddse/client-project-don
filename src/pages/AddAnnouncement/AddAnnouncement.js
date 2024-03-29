import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import validate from "validate.js";
import { regions } from "./data";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../ContactUs/LoggedIn.css";
import AppBarMur from "../../components/AppBar/AppBarMur";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AddAnnouncementSchema } from "../util/schema";
import { AddPost } from "../../services/posts";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import background from"../../assets/images/background.png"
import addAnnonceImage from"../../assets/images/addAnnonce.png"
import donate from"../../assets/images/donate.png"


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  image:{
    marginTop:"10%",
    width:"80%",
    display: "block",
  marginLeft:"auto",
  marginRight: "auto",
  },
  LogoGrid:{
    backgroundPosition: "center",
    textAlign:"center"
  },
  form:{
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: " auto",

    },
  formGrid: {
    backgroundColor: "rgba(125, 138, 255, 0.1)",
  },
}));

const AddAnnoucement = () => {
  const classes = useStyles();
  const { user, ListCategories } = useContext(DonContext);
  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      objet: "",
      detail: "",
      adresse: "",
      telephone: "",
      subcategorie: {
        id: "",
        nom: "",
      },
      image: null,
    },
    isValid: false,
    errors: {},
    touched: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, AddAnnouncementSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const onDrop = (picture) => {
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        image: picture,
      },
    }));
  };

  let history = useHistory();
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const submitFormHandler = async (e) => {
    e.preventDefault();
    // console.log(formState);
    e.preventDefault();
    setisLoading(true);
    const form = new FormData();

    if (formState.values.image) {
      let result = await toBase64(formState.values.image[0]).catch((e) =>
        Error(e)
      );
      form.append("image", result);
    }

    form.append("objet", formState.values.objet);
    form.append("detail", formState.values.detail);
    form.append("adresse", formState.values.adresse);
    form.append("telephone", formState.values.telephone);
    const subcategId = formState.values.subcategorie.id;
    await AddPost(form, subcategId, user.userId);
    setisLoading(false);
    history.push("/announcements");
  };

  const inputChangeHandler = (e) => {
    e.persist();
    const id = e.target.value.slice(
      e.target.value.indexOf("$") + 1,
      e.target.value.length
    );
    const name = e.target.value.slice(0, e.target.value.indexOf("$"));
    e.target.name === "subcategorie"
      ? setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            [e.target.name]: {
              id: id,
              nom: name,
            },
          },
          touched: {
            ...formState.touched,
            [e.target.name]: true,
          },
        }))
      : setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            [e.target.name]: e.target.value,
          },
          touched: {
            ...formState.touched,
            [e.target.name]: true,
          },
        }));
  };

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };
  return (
    <div  >
    <AppBarMur />
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={12} sm={6} className={classes.LogoGrid}>
      <img  className={classes.image} src={addAnnonceImage} />
    </Grid>
    <Grid item xs={12} sm={6}  className={classes.formGrid}>
    <img style={{marginLeft:"40%"}} height="140" src={donate}/>
      <form onSubmit={(e) => submitFormHandler(e)} className={classes.form}>
        <TextField
          id="object"
          name="objet"
          label="Titre"
          variant="outlined"
          error={hasError("objet")}
          helperText={hasError("objet") ? formState.errors.objet[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.objet}
        />
        <br />
        <TextField
          value={formState.values.detail}
          onChange={inputChangeHandler}
          id="detail"
          name="detail"
          label="Détails"
          multiline
          rows={4}
          variant="outlined"
        />
        <br />
        <TextField
          id="telephone"
          name="telephone"
          label="Numéro de téléphone"
          variant="outlined"
          error={hasError("telephone")}
          helperText={
            hasError("telephone") ? formState.errors.telephone[0] : null
          }
          onChange={inputChangeHandler}
          value={formState.values.telephone}
        />
        <br />
        <FormControl variant="outlined" error={hasError("adresse")}>
          <InputLabel htmlFor="outlined-age-native-simple">Ville</InputLabel>
          <Select
            native
            label="Ville"
            inputProps={{
              name: "adresse",
              id: "outlined-age-native-simple",
            }}
            value={formState.values.adresse}
            onChange={inputChangeHandler}
          >
            <option aria-label="None" value="" />
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Select>
          <FormHelperText>
            {hasError("adresse") ? formState.errors.adresse[0] : null}
          </FormHelperText>
        </FormControl>
        <br />
        <FormControl variant="outlined" error={hasError("subcategorie")}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Catégorie
          </InputLabel>
          <Select
            native
            label="Catégorie"
            inputProps={{
              name: "subcategorie",
              id: "outlined-age-native-simple",
            }}
            onChange={inputChangeHandler}
          >
            <option value="" />
            {ListCategories.map((categ) => {
              let Result = categ.subcategs.map((subcateg) => {
                return (
                  <option value={subcateg.nom + "$" + subcateg._id}>
                    {subcateg.nom}
                  </option>
                );
              });
              return <optgroup label={categ.nom}>{Result}</optgroup>;
            })}
          </Select>
          <FormHelperText>
            {hasError("subcategorie") ? formState.errors.subcategorie[0] : null}
          </FormHelperText>
        </FormControl>
        <ImageUploader
          singleImage={true}
          withPreview={true}
          withIcon={true}
          label="Taille maximale du fichier: 5 Mo, acceptée: jpg"
          buttonText="importer une image"
          onChange={onDrop}
          fileSizeError="la taille du fichier est trop grande"
          fileTypeError="extension de fichier n'est pas prise en charge"
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginTop: "30px",
          }}
          disabled={isLoading || !formState.isValid}
        >
          Poster
        </Button>
        {isLoading && <LinearProgress color="primary" />}
      </form><br/><br/>
      </Grid>
    <br/>
    </Grid>
    <Footer/>
    </div>
  );
};
export default AddAnnoucement;
