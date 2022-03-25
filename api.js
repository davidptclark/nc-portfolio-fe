import axios from "axios";

const ncApi = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const postCloudinary = (url, formData, tags) => {
  return fetch(url, {
    method: "post",
    body: formData,
  }).then((res) => res.json());
  // .then((data) => {
  //   return fetch("https://api.cloudinary.com/v1_1/ncfiveguysuk/auto/tags", {
  //     method: "post",
  //     body: { tag: tags, public_id: data.asset_id, command: "add" },
  //   });
  // });
};

export const postVideoToDatabase = (videoData) => {
  // return ncApi.post("/videos", videoData).then(() => {});
};
