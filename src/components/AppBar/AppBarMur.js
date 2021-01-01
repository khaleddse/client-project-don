import React, { useContext } from "react";
import { DonContext } from "../../contexte/donContexte";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CustomizedMenus from "./Menu";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    marginLeft: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const { isAuth, user, setAuthHandler } = useContext(DonContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  let history = useHistory();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutHandler = () => {
    //localStorage.clear()
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    setAuthHandler(false);
    history.push("/signin");
  };
  const loginRedirect = () => {
    history.push("/signin");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/profile")}>
        Profile {user.nom}
      </MenuItem>
      {isAuth ? (
        <div>
          <MenuItem onClick={() => history.push("/edit")}>
            <AccountBoxOutlinedIcon />
            My account
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <LockOutlinedIcon />
            se déconnecter
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={loginRedirect}>
          <LockOpenOutlinedIcon />
          Se Connecter
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {history.location.pathname !== "/AjoutAnnonce" && (
        <MenuItem
          onClick={(e) => {
            isAuth ? history.push("/AjoutAnnonce") : history.push("/signin");
          }}
        >
          <IconButton color="inherit" aria-label="Ajouter annonce">
            <Badge color="secondary">
              <AddToPhotosIcon />
            </Badge>
          </IconButton>
          <p>Ajouter annonce</p>
        </MenuItem>
      )}

      {history.location.pathname !== "/contactus" && (
        <MenuItem
          onClick={(e) => {
            history.push("/contactus");
          }}
        >
          <IconButton aria-label="Contact support" color="inherit">
            <Badge color="secondary">
              <ContactSupportIcon />
            </Badge>
          </IconButton>
          <p>Contacter support</p>
        </MenuItem>
      )}
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <HideOnScroll {...props}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            {history.location.pathname === "/announcements" && (
              <CustomizedMenus selectedCateg={props.selectedCateg} />
            )}

            <IconButton
              color="inherit"
              onClick={(e) => {
                history.location.pathname !== "/announcements" &&
                  history.push("/announcements");
              }}
            >
              <Typography className={classes.title} variant="h6" noWrap>
                NajemN3awen
              </Typography>
            </IconButton>

            {history.location.pathname === "/announcements" && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => props.filterHandler(e.target.value)}
                />
              </div>
            )}

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/*<Link to="/AjoutAnnonce">
                <Fab  style={{ color: green[500] }}  aria-label="add" >
              <AddIcon />
              
            </Fab>   */}
              {/* </Link> */}
              {history.location.pathname !== "/AjoutAnnonce" && (
                <IconButton
                  color="inherit"
                  aria-label="Ajouter annonce"
                  onClick={(e) => {
                    isAuth ? history.push("/AjoutAnnonce") : history.push("/");
                  }}
                >
                  <Badge color="secondary">
                    <AddToPhotosIcon />
                  </Badge>
                </IconButton>
              )}
              {history.location.pathname !== "/contactus" && (
                <IconButton
                  aria-label="Contact support"
                  color="inherit"
                  onClick={(e) => {
                    history.push("/contactus");
                  }}
                >
                  <Badge color="secondary">
                    <ContactSupportIcon />
                  </Badge>
                </IconButton>
              )}

              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </HideOnScroll>
  );
}
