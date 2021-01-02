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
export const GetAllAvis = () => {
     return axios
   .get(`http://localhost:5000/avis/`)
    .then((resData) => {
         return resData;
      })
   .catch((err) => {
        console.error(err);
        return err
   });
};
export const DeleteAvis = (id) => {
     return axios
   .delete(`http://localhost:5000/avis/${id}`)
    .then((resData) => {
         return resData;
      })
   .catch((err) => {
        console.error(err);
        return err
   });
};