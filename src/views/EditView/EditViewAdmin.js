import AppBarMur from "../../components/AppBar/AppBarMur";
import Edit from "../../components/UI/editpage/EditPage";
import { useContext, useState } from "react";
import { TextField } from "@material-ui/core";
import { DonContext } from "../../contexte/donContexte";
import Button from "@material-ui/core/Button";
import decode from "jwt-decode";
import { updateadmin } from "../../services/admin-service";

const EditViewAdmin = () => {
  const { admin, setAdminHandler } = useContext(DonContext);
  const { nom, prenom, email, tel } = admin;
  const [formupdatead, setFormUpDatead] = useState({
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
    setFormUpDatead((formupdatead) => ({
      ...formupdatead,
      [e.target.name]: {
        ...formupdatead[e.target.name],
        value: e.target.value,
      },
    }));
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    const { nom, prenom, email, tel } = formupdatead;
    try {
      const { token } = await updateadmin({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        tel: tel.value,
      });

      setAdminHandler(decode(token));
    } catch (err) {
      throw err;
    }
  };

  let fieldsArray = [];
  for (let key in formupdatead) {
    fieldsArray.push({
      id: key,
      value: formupdatead[key].value,
      name: formupdatead[key].name,
    });
  }
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
    </div>
  );
};
export default EditViewAdmin;
