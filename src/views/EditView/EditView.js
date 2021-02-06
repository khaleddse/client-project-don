import AppBarMur from "../../components/AppBar/AppBarMur";
import Edit from "../../components/UI/editpage/EditPage";
import { useContext, useState } from "react";
import { TextField } from "@material-ui/core";
import { DonContext } from "../../contexte/donContexte";
import Button from "@material-ui/core/Button";
import decode from "jwt-decode";
import { updateUser } from "../../services/UserServices";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../../components/Footer/Footer";
import Grid from "@material-ui/core/Grid";
import avatar from"../../assets/images/avatar1.png"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const EditView = () => {
  const { user, setUserHandler } = useContext(DonContext);
  const { nom, prenom, email, tel } = user;
  const [isSucceed, setIsSucceed] = useState(false);
  const [formupdate, setFormUpDate] = useState({
    nom: {
      value: nom,
      name: "nom",
    },
    prenom: {
      value: prenom,
      name: "prenom",
    },
    email: {
      value: email,
      name: "email",
    },
    tel: {
      value: tel,
      name: "tel",
    },
  });
  const onChangeHandler = (e) => {
    setFormUpDate((formupdate) => ({
      ...formupdate,
      [e.target.name]: {
        ...formupdate[e.target.name],
        value: e.target.value,
      },
    }));
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    const { nom, prenom, email, tel } = formupdate;
    try {
      const { token } = await updateUser({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        tel: tel.value,
      });

      setUserHandler(decode(token));
      setIsSucceed(true);
    } catch (err) {
      throw err;
    }
  };

  let fieldsArray = [];
  for (let key in formupdate) {
    fieldsArray.push({
      id: key,
      value: formupdate[key].value,
      name: formupdate[key].name,
    });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSucceed(false);
  };

  return (
    <div>
      <AppBarMur />
      <Grid container component="main"style={{marginTop:"60px"}} >
      <Grid item xs={false} sm={2} style={{textAlign:"center"}}>
      <img
            alt="image2"
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              display: "block",
            }}
            height="110"
            src={avatar}
        />
        <h1>{nom+" "+prenom}</h1>
      </Grid>
      <Grid item xs={12} sm={8} square>
      <form onSubmit={(e) => updateHandler(e)} style={{minHeight:"500px" }}>
        {fieldsArray.map(({ name, value }) => (
          <Edit Type={name} Value={value} key={name}>
            <TextField
              name={name}
              id={name}
              label={name}
              value={value}
              onChange={(e) => onChangeHandler(e)}
            />
          </Edit>
        ))}
        <Button variant="contained" color="primary" type="submit" style={{marginTop:"20px",marginBottom:"20px"}}>
          Changer
        </Button>
      </form>
      </Grid>
      <Grid item xs={false} sm={2} />
      </Grid>
      <Snackbar open={isSucceed} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Votre Compte a éte modifié avec succes !
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};
export default EditView;
