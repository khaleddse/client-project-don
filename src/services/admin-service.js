import { setToken } from "./utils";
import axios from "axios";

export const updateadmin = (updateData) => {
  const token = localStorage.getItem("token");
  setToken(token);
  return axios
    .post("http://localhost:5000/admin/update", updateData)
    .then((resData) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", resData.data.token);
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const addAdmin = (authData) => {
  return axios
    .post("http://localhost:5000/admin/add", authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getAllAdmin = () => {
  return axios
    .get("http://localhost:5000/admin/")
    .then((resuser) => {
      return resuser.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deltadmin = (adminid) => {
  return axios
    .delete(`http://localhost:5000/admin/${adminid}`)
    .then((message) => {
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
};
