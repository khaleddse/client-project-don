import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#3f51b5",
    padding: theme.spacing(2),
  },
  CopyrightBody: {
    height: "30px",
    backgroundColor: "#1a237e",
  },
  CopyrightContent: {
    textAlign: "center",
    color: "white",
    align: "center",
    padding: "5px",
  },
  button: {
    backgroundColor: "#3f51b5",
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <footer className={classes.footer}>
      <Typography
          variant="subtitle1"
          align="center"
          color="#f2f2f2"
          component="p"
        >
          <b>Contacter nous sur Média social : Najem_N3awen</b>
        </Typography>
        <Typography variant="h6" align="center" gutterBottom color="#f2f2f2">
          <Button className={classes.button}>
          <img width="24" height="24" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/83-facebook-512.png"/>
          </Button>
          <Button className={classes.button}>
            <img width="24" height="24" src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_3-instagram-512.png"/>
          </Button>
          <Button className={classes.button}>
            <img width="24" height="24" src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-512.png"/>
          </Button>
          <Button className={classes.button}>
            <img width="24" height="24" src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-512.png"/>
          </Button>
        </Typography>

      </footer>
      {/* End footer */}
      <div className={classes.CopyrightBody}>
        <Typography variant="body2" className={classes.CopyrightContent}>
          {"Copyright © "}
          <Link href="https://material-ui.com/" style={{ color: "#ffffff" }}>
            NajemN3awen
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div>
  );
}
