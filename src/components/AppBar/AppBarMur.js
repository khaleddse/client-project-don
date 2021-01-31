import React, { useContext, useState, useEffect, useRef } from "react";
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
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { addCateg } from "../../services/categories";

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
  const {
    isAuth,
    user,
    setAuthHandler,
    isAuthAdmin,
    isAuthempl,
    setAuthHandlerAdmin,
    setUserHandler,
    setAuthHandlerEmpl,
    setValideHandler,
    valide,
  } = useContext(DonContext);

  const classes = useStyles();
  const [formState, setFormState] = useState({
    values: {
      nom: "",
    },
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  let history = useHistory();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    setUserHandler();
    setAuthHandlerEmpl(false);
    setAuthHandler(false);
    setAuthHandlerAdmin(false);
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

  const handleClose = () => {
    setValideHandler(false);
  };
  const handleClickOpen = () => {
    setValideHandler(true);
  };

  const categorieadd = async () => {
    const { nom } = formState.values;
    console.log(nom);
    await addCateg({ nom });
    document.location.reload();
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (valide) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [valide]);

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
      {isAuthAdmin ? (
        <div>
          <MenuItem onClick={() => history.push("/Listuser")}>
            <PeopleAltOutlinedIcon />
            List des Users
          </MenuItem>
          <MenuItem onClick={() => history.push("/AdminList")}>
            <SupervisorAccountOutlinedIcon />
            List des Admins
          </MenuItem>

          <MenuItem onClick={() => history.push("/addadmin")}>
            <PersonAddOutlinedIcon />
            Ajouter personel
          </MenuItem>

          <MenuItem onClick={() => handleClickOpen()}>
            <PersonAddOutlinedIcon />
            Ajouter Categorie
          </MenuItem>

          <MenuItem onClick={() => history.push("/ListAvis")}>
            <ListAltOutlinedIcon />
            List des Avis
          </MenuItem>
          <MenuItem onClick={() => history.push("/updatecompte")}>
            <AccountBoxOutlinedIcon />
            Mon Compte
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <LockOutlinedIcon />
            se déconnecter
          </MenuItem>
        </div>
      ) : isAuthempl ? (
        <div>
          <MenuItem onClick={() => history.push("/Listuser")}>
            <PeopleAltOutlinedIcon />
            List des Users
          </MenuItem>
          <MenuItem onClick={() => handleClickOpen()}>
            <PersonAddOutlinedIcon />
            Ajouter Categorie
          </MenuItem>
          <MenuItem onClick={() => history.push("/ListAvis")}>
            <ListAltOutlinedIcon />
            List des Avis
          </MenuItem>
          <MenuItem onClick={() => history.push("/updatecompte")}>
            <AccountBoxOutlinedIcon />
            Mon Compte
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <LockOutlinedIcon />
            se déconnecter
          </MenuItem>
        </div>
      ) : isAuth ? (
        <div>
          <MenuItem onClick={() => history.push("/profile")}>
            Profile {user.nom}
          </MenuItem>

          <MenuItem onClick={() => history.push("/edit")}>
            <AccountBoxOutlinedIcon />
            Mon Compte
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
      {(isAuthAdmin || isAuthempl) && (
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
        <p>Paramètre</p>
      </MenuItem>
    </Menu>
  );
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

            {(history.location.pathname === "/announcements" ||
              history.location.pathname === "/profile") && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Rechercher…"
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
              {history.location.pathname !== "/AjoutAnnonce" && (
                <IconButton
                  color="inherit"
                  aria-label="Ajouter annonce"
                  onClick={(e) => {
                    isAuth
                      ? history.push("/AjoutAnnonce")
                      : history.push("/signin");
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

              {(isAuthAdmin || isAuthempl) && (
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge
                    onClick={(e) => history.push("/ListAvis")}
                    badgeContent={17}
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <SettingsIcon />
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
        <Dialog
          open={valide}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Ajouter categorie</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <TextField
                id="nom"
                name="nom"
                label="categ"
                onChange={inputChangeHandler}
                value={formState.values.nom}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button color="primary" onClick={(e) => categorieadd()}>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </HideOnScroll>
  );
}
