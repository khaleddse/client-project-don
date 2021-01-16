import { setToken } from "./utils";
import axios from "axios";

export const updateUser = (updateData) => {
  const token = localStorage.getItem("token");
  setToken(token);
  return axios
    .post("http://localhost:5000/user/update/", updateData)
    .then((resData) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", resData.data.token);

      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getAlluser = () => {
  return axios
    .get("http://localhost:5000/user/")
    .then((resuser) => {
      return resuser.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const delteuser = (userid) => {
  return axios
    .delete(`http://localhost:5000/user/${userid}`)
    .then((message) => {
      return message;
    })
    .catch((err) => {
      console.error(err);
    });
};
