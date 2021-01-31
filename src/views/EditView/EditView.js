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
  let history = useHistory();
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
      <form onSubmit={(e) => updateHandler(e)}>
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
        <Button variant="contained" color="primary" type="submit">
          change
        </Button>
      </form>
      <Snackbar open={isSucceed} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Votre Compte a éte modifié avec succes !
        </Alert>
      </Snackbar>
    </div>
  );
};
export default EditView;
