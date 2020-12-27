import React from "react";
import AppBarMur from "../../components/AppBar/AppBarMur";
const loggedIn = (props) => (
  <div>
    <AppBarMur
      filterHandler={props.filterHandler}
      selectedCateg={props.selectedCateg}
    />
    <br />
    <section className="auth-form">{props.children}</section>
  </div>
);

export default loggedIn;
