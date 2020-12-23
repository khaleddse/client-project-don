import axios from "axios";

export const AddAvis = (avisData) => {
         return axios
       .post(`http://localhost:5000/avis/add`, avisData)
        .then((resData) => {
             return resData;
          })
       .catch((err) => {
            console.error(err);
            return err
       });
   };