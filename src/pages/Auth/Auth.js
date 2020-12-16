import React from "react";
import AppBar from "../../components/AppBar/AppBar";
const auth = (props) => (
  <div>
    <AppBar />
    <section className="auth-form">{props.children}</section>
  </div>
);

export default auth;
