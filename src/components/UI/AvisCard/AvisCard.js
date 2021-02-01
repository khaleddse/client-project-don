import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { DeleteAvis,repondreAvis } from "../../../services/avis";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
  form: {
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    marginRight:"10px",
    marginLeft:"10px",
    marginBottom: "10%",
    marginTop: "4%",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  columnFirst: {
    flexBasis: "10%",
  },
  columnSecond: {
    flexBasis: "76%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function AvisCard(props) {
  const [isSucceed, setIsSucceed] = useState(false);
  let history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState({
    values: {
      email: props.email,
      message: "",
    }
  });
  const inputChangeHandler = (e) => {
    e.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      }
    }));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteAvisHandler = async (id) => {
    if (window.confirm("Vous voulez supprimer ce message ?")) {
      setisLoading(true);
      await DeleteAvis(id);
      setisLoading(false);
      window.location.reload()
    }
  };
  const repondreHandler=async(e)=>{
    e.preventDefault();
    setisLoading(true);
    const result=await repondreAvis(formState.values);
    if(result.status===200){
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          message:"",
        }
      }));
      setIsSucceed(true)
      await deleteAvisHandler(props.id)
    }
    console.log(result)
    setisLoading(false);
    setOpen(false);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSucceed(false);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion style={{ backgroundColor: "#d6e0ff" }} defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnFirst}>
            <Typography className={classes.heading}>Email </Typography>
          </div>
          <div className={classes.columnSecond}>
            <Typography variant="caption" className={classes.secondaryHeading}>
              {props.email}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.columnFirst}>
            <Typography variant="caption" className={classes.heading}>
              Message{" "}
            </Typography>
          </div>
          <div className={classes.columnSecond}>
            <Typography className={classes.secondaryHeading}>
              {props.detail}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <Button
                size="small"
                color="primary"
                onClick={handleClickOpen}
              >
                Repondre
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => deleteAvisHandler(props.id)}
              >
                Supprimer
              </Button>
            </div>
          )}
        </AccordionActions>
      </Accordion>
      <br />
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Repondre à: {props.email}</DialogTitle>
        <form  className={classes.form} onSubmit={(e)=>repondreHandler(e)}>
            <TextField
              style={{ backgroundColor: "#f2f2f2" }}
              value={formState.values.message}
              onChange={inputChangeHandler}
              id="message"
              name="message"
              label="Exprimez Vous"
              multiline
              rows={6}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginTop: "30px",
              }}
              
            >
              Envoyer
            </Button>
            {isLoading && <LinearProgress color="primary" />}
            </form>
      </Dialog>
      <Snackbar
              open={isSucceed}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert onClose={handleCloseAlert} severity="success">
                Merci, votre message a bien été envoyé !
              </Alert>
            </Snackbar>
    </div>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}