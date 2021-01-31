import { useState, useEffect } from "react";
import Table from "../../components/UI/Table/Table";
import { getAlluser } from "../../services/UserServices";
import AppBarMur from "../../components/AppBar/AppBarMur";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { delteuser } from "../../services/UserServices";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:"10px",
    textAlign: "center"
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [rowstate, setRowState] = useState([]);
  const [formState, setFormState] = useState({
    values: {
      userid: "",
    },
  });
  useEffect(() => {
    getusers();
  }, []);
  let history = useHistory();
  const getusers = async () => {
    const users = await getAlluser();

    const result = users.Users.map(({ nom, prenom, email, tel, _id }) => {
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
    if (window.confirm("Êtes vous sûr de supprimer cet utilisateur ?\ntous les annonces reliés vont être supprimés !")) {
    const { userid } = formState.values;
    await delteuser(userid);
    const rst = rowstate.filter((resultat) => {
      if (resultat.id !== userid) {
        return resultat;
      }
    });
    setFormState({values: {
      userid: "",
    }})
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
    <div style={{backgroundColor: "#f2f2f2"}} >
      <AppBarMur />
      <CssBaseline />
      <h1
        style={{
          display: "block",
          color: "#34495e",
          textAlign: "center",
          height: "40px",
        }}
      >
        List des Utilisteurs
      </h1>
      <div style={{ margin: "10px 40px" ,backgroundColor: "#ffffff",boxShadow: "4px 4px  #ccc"}}>
      <Table rows={rowstate} />
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitFormHandler(e)}
      >
        <TextField
          id="custom-css-standard-input" 
          label="ID Utilisteur"
          name="userid"
          variant="filled"
          color="secondary"
          value={formState.values.userid}
          onChange={inputChangeHandler}
        /><br/><br/>
        <Button variant="contained" color="secondary" type="submit">
          Supprimer
        </Button>
      </form>
      <br/><br/><br/>
      <Footer/>
    </div>
  );
};
export default UserList;
