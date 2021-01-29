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
