import React, { useEffect ,useContext} from "react";
import { DonContext } from "../../contexte/donContexte";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import {getCategories  } from "../../services/categories";
import './Menu.css';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const { ListCategories,setListCategHandler } = useContext(
    DonContext
  );
  useEffect(() => {
    CategList();
  }, []);
  const CategList = async () => {
    const categories = await getCategories();
    setListCategHandler(categories)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon onClick={handleClick} />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
                <StyledMenuItem onClick={() => props.selectedCateg(null,"all")} >
                <ListItemText primary={"Toutes les catégories"} />
              </StyledMenuItem>
        {ListCategories.map((categ) => {
          let Result = categ.subcategs.map((subcateg) => {
            return (
              <StyledMenuItem
                className="mys"
                key={subcateg._id}
                id={subcateg._id}
                onClick={() => props.selectedCateg(subcateg._id,"subcateg")}
              >
                <ListItemText
                  id={subcateg._id}
                  key={subcateg._id}
                  secondary={"• " + subcateg.nom}
                />
              </StyledMenuItem>
            );
          });
          return (
            <div key={categ._id}>
                <ListItemText id={categ._id} primary={"✦ "+categ.nom} />
              {Result}
            </div>
          );
        })}
      </StyledMenu>
    </div>
  );
}
