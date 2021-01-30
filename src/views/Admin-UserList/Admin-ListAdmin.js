import { useState, useEffect } from "react";
import Table from "../../components/UI/Table/Table";
import { getAllAdmin } from "../../services/admin-service";
import AppBarMur from "../../components/AppBar/AppBarMur";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deltadmin } from "../../services/admin-service";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    textAlign: "center",
  },
}));

const AdminList = () => {
  const classes = useStyles();
  const [rowstate, setRowState] = useState([]);
  const [formState, setFormState] = useState({
    values: {
      adminid: "",
    },
  });
  useEffect(() => {
    getusers();
  }, []);
  let history = useHistory();
  const getusers = async () => {
    const admins = await getAllAdmin();
    console.log(admins);
    const simpleadmin = admins.filter((admins) => {
      if (admins.grade.toUpperCase() === "ADMIN") {
        return admins;
      }
    });
    const result = simpleadmin.map(({ nom, prenom, email, tel, _id }) => {
      return {
        id: _id,
        firstName: nom,
        lastName: prenom,
        email: email,
        tel: tel,
      };
    });

    setRowState(result);
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Êtes vous sûr de supprimer cet utilisateur ?\ntous les annonces reliés vont être supprimés !"
      )
    ) {
      const { adminid } = formState.values;
      await deltadmin(adminid);
      const rst = rowstate.filter((resultat) => {
        if (resultat.id !== adminid) {
          return resultat;
        }
      });
      setFormState({
        values: {
          adminid: "",
        },
      });
      setRowState(rst);
    }
  };
  const inputChangeHandler = (e) => {
    e.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
    }));
  };
  return (
    <div>
      <AppBarMur />
      <Table rows={rowstate} />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitFormHandler(e)}
      >
        <TextField
          id="custom-css-standard-input"
          label="ID Admin"
          name="adminid"
          variant="filled"
          color="secondary"
          value={formState.values.adminid}
          onChange={inputChangeHandler}
        />
        <br />
        <br />
        <Button variant="contained" color="secondary" type="submit">
          Supprimer
        </Button>
      </form>
    </div>
  );
};
export default AdminList;
