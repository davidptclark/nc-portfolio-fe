import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const getVideos = (topic, sortBy, orderBy, username) => {
  return api
    .get(`/videos`, { params: { username, topic, sortBy, orderBy } })
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

export const postUser = (username, password, type) => {
  return api
    .post("/users", { username, password, type })
    .then(({ data: { user } }) => {
      return user;
    });
};

export const patchUser = ({ username, bio, avatar_url, social_url }) => {
  return api.patch(`/users/${username}`, { bio, avatar_url, social_url });
};
