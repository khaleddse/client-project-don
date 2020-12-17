import { useState, useEffect } from "react";
import validate from "validate.js";
import "../Auth/Auth.css";
import Auth from "../Auth/Auth";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AddAnnouncementSchema } from "../util/schema";
import { AddPost } from "../../services/posts";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const AddAnnoucement = () => {
  const [regionsState, setRegions] = useState([
    "Tunis",
    "Ariana",
    "Ben Arous",
    "Mannouba",
    "Bizerte",
    "Nabeul",
    "Béja",
    "Jendouba",
    "Zaghouan",
    "Siliana",
    "Le Kef",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Kasserine",
    "Sidi Bouzid",
    "Kairouan",
    "Gafsa",
    "Sfax",
    "Gabès",
    "Médenine",
    "Tozeur",
    "Kebili",
    "Ttataouine",
  ]);
  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      objet: "",
      detail: "",
      adresse: "",
      telephone:"",
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
    console.log(picture);
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        image: picture,
      },
    }));
    console.log(picture[0])
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(formState);
    e.preventDefault();
    setisLoading(true);

    const form = new FormData();
    form.append("image", formState.values.image[0]);
    form.append("objet", formState.values.objet);
    form.append("detail", formState.values.detail);
    form.append("adresse", formState.values.adresse);
    form.append("telephone", formState.values.telephone);

    const response = await AddPost(form);
    console.log(response.addedAnnonce.image);
    const RSt = Buffer.from(
      response.addedAnnonce.image.data,
      "binary"
    ).toString("base64");
    setisLoading(false);
  };

  const inputChangeHandler = (e) => {
    e.persist();
    setFormState((formState) => ({
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
    <Auth>
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
          helperText={hasError("telephone") ? formState.errors.telephone[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.telephone}
        />
        <br />
        <FormControl
          variant="outlined"
          error={hasError("adresse")}
        >
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
            {regionsState.map((region) => (
              <option value={region}>{region}</option>
            ))}
          </Select>
          <FormHelperText>{hasError("adresse") ? formState.errors.adresse[0] : null}</FormHelperText>
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
    </Auth>
  );
};
export default AddAnnoucement;
