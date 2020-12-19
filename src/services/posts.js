import axios from "axios";

export const getPosts = () =>
  axios
    .get("http://localhost:5000/annonce/")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
    });

 export const AddPost = (authData,subcategId,userid) => {
   console.log(authData)
        return axios
      .post(`http://localhost:5000/annonce/add/${subcategId}/${userid}`, authData)
       .then((resData) => {
            return resData.data;
         })
      .catch((err) => {
           console.error(err);
      });
  };