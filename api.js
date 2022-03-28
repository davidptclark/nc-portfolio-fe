import axios from "axios";

const videoApi = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const postCloudinary = (url, formData, tags) => {
  return fetch(url, {
    method: "post",
    body: formData,
  }).then((res) => res.json());
};

export const postVideoToDatabase = (returnData) => {
  const videoData = {};
  console.log(returnData);
  // return videoApi.post("/videos").then(() => {});
};

export const signinUser = (username, password) => {
  return videoApi
    .post("/signin", { username, password })
    .then(({ data: { user } }) => {
      return user;
    });
};
