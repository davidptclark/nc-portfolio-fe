import axios from "axios";

const ncApi = axios.create({
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
  // return ncApi.post("/videos").then(() => {});
};
