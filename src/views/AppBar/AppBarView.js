import { useState, useEffect } from "react";
import AppBar from "../../components/AppBar/AppBar";

const render = (props) => {
  return <AppBar>{props.children}</AppBar>;
};

export default render;
