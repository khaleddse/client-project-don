import axios from "axios";

export const getPosts = () =>
  axios
    .get("https://rickandmortyapi.com/api/character/?page=1")
    .then(({ data }) => data.results)
    .catch((err) => {
      console.error(err);
    });
