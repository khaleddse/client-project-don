import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { DeleteAvis } from "../../../services/avis";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
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
  let history = useHistory();
  const [isLoading, setisLoading] = useState(false);

  const deleteAvisHandler = async (id) => {
    if (window.confirm("êtes-vous sûr de supprimer ce message ?")) {
      setisLoading(true);
      await DeleteAvis(id);
      setisLoading(false);
      history.push("/contactus");
    }
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
                onClick={() => deleteAvisHandler(props.id)}
              >
                Supprimer
              </Button>
            </div>
          )}
        </AccordionActions>
      </Accordion>
      <br />
    </div>
  );
}
