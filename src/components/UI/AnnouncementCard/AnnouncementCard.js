import React, { useContext } from "react";
import { DonContext } from "../../../contexte/donContexte";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import "./AnnouncementCard.css";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import NotFound from '../../../assets/images/NotFound.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    width: "100%",
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[800],
  },
}));

export default function RecipeReviewCard(props) {
  const { isAuthAdmin, isAuthempl } = useContext(DonContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const annoncePageHandler = () => {
    history.push("/annonce?_id=" + props.id);
  };

  return (
    <Card className={classes.root} id={props._id} key={props._id}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.user[0]}
          </Avatar>
        }
        title={props.user}
        subheader={
          props.createdAt.slice(11, 16) + " le " + props.createdAt.slice(0, 10)
        }
      />
      {props.image ? (
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.user}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image={NotFound}
          title={props.user}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Titre :{props.objet}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {isAuthAdmin || isAuthempl ? (
          <Button color="secondary" onClick={() => props.deleteannonce()}>
            Supprimer
          </Button>
        ) : null}
        {history.location.pathname === "/profile" && (
          <Button color="secondary" onClick={() => props.deleteannonce()}>
            Supprimer
          </Button>
        )}

        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
        >
          <a
            style={{ color: "grey", textDecoration: "none" }}
            href={"/annonce?_id=" + props.id}
            target="_blank"
          >
            {" "}
            Voir plus...
          </a>
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.fixed}>
          <Typography paragraph>Détail: {props.detail}</Typography>
          <Typography paragraph>
            <RoomOutlinedIcon style={{ fontSize: 15 }} /> : {props.adresse}{" "}
            <br />
            <CallOutlinedIcon style={{ fontSize: 15 }} /> : {props.telephone}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
