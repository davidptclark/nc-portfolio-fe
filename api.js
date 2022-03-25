import axios from "axios";

const videoApi = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});
export const signinUser = (username, password) => {
  return videoApi
    .post("/signin", { username, password })
    .then(({ data: { user } }) => {
      return user;
    });
};
