import axios from "axios";
import { setToken } from "./utils";

export const getPostsBySubCateg = (id) =>
  axios
    .get(`http://localhost:5000/subcategorie/${id}`)
    .then(({ data }) => data.annonces)
    .catch((err) => {
      console.error(err);
    });
export const getPostsByCateg = (id) =>
  axios
    .get(`http://localhost:5000/categorie/${id}`)
    .then(({ data }) => {
      return data.subcategs;
    })
    .catch((err) => {
      console.error(err);
    });
export const getPostByid = (id) =>
  axios
    .get("http://localhost:5000/annonce/" + id)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
export const getPosts = () =>
  axios
    .get("http://localhost:5000/annonce/")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });

export const AddPost = (authData, subcategId, userid) => {
  // get token from local storage
  //setToken(token)
  return axios
    .post(`http://localhost:5000/annonce/add/${subcategId}/${userid}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deltePost = (annonceid) => {
  const token = localStorage.getItem("token");
  setToken(token);
  return axios
    .delete(`http://localhost:5000/annonce/${annonceid}`)
    .then((resdata) => {
      return resdata;
    })
    .catch((err) => {
      console.error(err);
    });
};
