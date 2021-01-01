import { useState, useEffect, useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import validate from "validate.js";
import { regions } from "./data";
import "../ContactUs/LoggedIn.css";
import LoggedIn from "../ContactUs/LoggedIn";
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
import { getCategories } from "../../services/categories";
import { useHistory } from "react-router-dom";

const AddAnnoucement = () => {
  const { isAuth, user,ListCategories } = useContext(DonContext);

 /* useEffect(() => {
    CategLoader();
  }, []);
  const [categoriesState, setCategories] = useState([]);*/

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
 /* const CategLoader = async () => {
    setisLoading(true);
    const response = await getCategories();
    //  console.log("response", response);
    setCategories(response);
    setisLoading(false);
  };*/

  useEffect(() => {
    const errors = validate(formState.values, AddAnnouncementSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const onDrop = (picture) => {
    //console.log(picture);
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
    <LoggedIn>
      <form onSubmit={(e) => submitFormHandler(e)} className="form">
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
      </form>
    </LoggedIn>
  );
};
export default AddAnnoucement;
