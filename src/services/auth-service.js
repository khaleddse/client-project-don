import axios from "axios";

export const signInHandler = (authData) => {
  return axios
    .post("http://localhost:5000/user/login", authData)
    .then((resData) => {
      localStorage.setItem("token", resData.data.token);
      localStorage.setItem("userId", resData.data.UserId);
      localStorage.setItem("success", resData.data.success)
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      //this.setAutoLogout(remainingMilliseconds);
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const signupHandler = (authData) => {
  return axios
    .post("http://localhost:5000/user/signup", authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const FindUser = (UserId)=>{
 return axios
  .get(`http://localhost:5000/user/${UserId}`)
  .then((resData)=>{
   
    return resData.data;
  })
  .catch((err) => {
    console.error(err);
  });
}
