import axios from "axios";

export const getUsers = (callback) => {
  axios
    .get("http://localhost:5000/admin/account")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};