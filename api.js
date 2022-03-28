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

export const postUser = (username, password, type) => {
  return videoApi
    .post("/users", { username, password, type })
    .then(({ data: { user } }) => {
      return user;
    });
};
