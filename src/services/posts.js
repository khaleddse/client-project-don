import axios from "axios";

export const getPosts = () =>
  axios
    .get("http://localhost:5000/annonce/")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });

 export const AddPost = (authData,subcategId) => {
   console.log(authData)
        return axios
      .post("http://localhost:5000/annonce/add/"+subcategId+"/5fd0144ddd7f780a1c6c0bd1", authData)
       .then((resData) => {
            return resData.data;
         })
      .catch((err) => {
           console.error(err);
      });
  };