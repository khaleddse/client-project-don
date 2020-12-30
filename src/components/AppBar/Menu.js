import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { getCategories } from "../../services/categories";

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
  const [categoriesState, setCategstate] = useState([]);
  useEffect(() => {
    CategList();
  }, []);
  const CategList = async () => {
    const categories = await getCategories();
    setCategstate(categories);
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
        {categoriesState.map((categ) => {
          let Result = categ.subcategs.map((subcateg) => {
            return (
              <StyledMenuItem
                key={subcateg._id}
                id={subcateg._id}
                onClick={() => props.selectedCateg(subcateg._id)}
              >
                <ListItemText
                  id={subcateg._id}
                  secondary={"• " + subcateg.nom}
                />
              </StyledMenuItem>
            );
          });
          return (
            <div key={categ._id}>
              <StyledMenuItem id={categ._id}>
                <ListItemText id={categ._id} primary={categ.nom} />
              </StyledMenuItem>
              {Result}
            </div>
          );
        })}
      </StyledMenu>
    </div>
  );
}
