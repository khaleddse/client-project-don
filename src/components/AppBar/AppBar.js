import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
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
  homeButton:{
    position: "absolute",
    top: 0,
    right: 5,
  }
 
}));
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function ButtonAppBar() {
  let history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>*/}
          <IconButton color="inherit" 
              onClick={(e)=>{history.location.pathname !== "/announcements" &&
               history.push("/announcements")}}>
              <Typography className={classes.title} variant="h6"  noWrap>
               NajemN3awen
              </Typography>
              </IconButton> 
              
           
          
          {/*<HomeIcon fontSize="large" />
          <Link to="/announcements" className={classes.grow} >
          </Link> 
          */}
          <IconButton color="inherit" 
          onClick={()=>{history.push("/announcements")}}
          className={classes.homeButton}>
           <HomeIcon style={{ fontSize: 35 }} />
           </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
