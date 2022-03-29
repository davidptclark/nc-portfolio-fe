import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const getVideos = (tag, sortBy, orderBy) => {
  return api
    .get(`/videos`, { params: { tag, sortBy, orderBy } })
    .then(({ data: { videos } }) => videos);
};

export const patchVotesByVideoId = (vote, video_id) => {
  return api.patch(`/videos/${video_id}`, { vote: vote });
};

export const postCloudinary = (url, formData, tags) => {
  return fetch(url, {
    method: "post",
    body: formData,
  }).then((res) => res.json());
};

export const postVideoToDatabase = (returnData) => {
  const videoData = {};
  console.log(returnData);
  return api.post("/videos", returnData).then(() => {});
};

export const signinUser = (username, password) => {
  return api
    .post("/signin", { username, password })
    .then(({ data: { user } }) => {
      return user;
    });
};

export const GetCommentsByVideoId = (video_id) => {
  return api.get(`/comments/${video_id}`);
};

export const getTags = () => {
  return api.get("/tags").then(({ data: { tags } }) => {
    return tags;
  });
};
