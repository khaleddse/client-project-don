import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:"5 px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
 
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NajemN3awen
          </Typography>
           
          <Link to="/announcements">
          {/*<HomeIcon fontSize="large" />*/}
      <HomeIcon style={{ fontSize: 40 }} />
          
          </Link>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}
