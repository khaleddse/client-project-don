import axios from "axios";

export const getPosts = () =>
  axios
    .get("http://localhost:5000/annonce/")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });

 export const AddPost = (authData) => {
   console.log(authData)
        return axios
      .post("http://localhost:5000/annonce/add/5fd0d0f86db36f21a4355a1e/5fd0144ddd7f780a1c6c0bd1", authData)
       .then((resData) => {
            return resData.data;
         })
      .catch((err) => {
           console.error(err);
      });
  };