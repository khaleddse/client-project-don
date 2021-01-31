import axios from "axios";

export const getCategories = () =>
  axios
    .get("http://localhost:5000/categorie/")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });

export const addCateg = (authData) => {
  axios
    .post("http://localhost:5000/categorie/add", authData)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });
};
