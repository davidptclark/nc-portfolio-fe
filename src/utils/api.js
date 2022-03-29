import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const getVideos = (tag, sortBy, orderBy, username) => {
  return api
    .get(`/videos`, { params: { username, tag, sortBy, orderBy } })
    .then(({ data: { videos } }) => videos);
};

export const patchVotesByVideoId = (vote, video_id) => {
  return api.patch(`/videos/${video_id}`, { vote: vote });
};

export const postCloudinary = (url, formData) => {
  return fetch(url + `/upload`, {
    method: "post",
    body: formData,
  }).then((res) => res.json());
};

export const postVideoToDatabase = (returnData) => {
  return api.post("/videos", returnData);
};

export const GetCommentsByVideoId = (video_id) => {
  return api.get(`/comments/${video_id}`);
};
export const signinUser = (username, password) => {
  return api
    .post("/signin", { username, password })
    .then(({ data: { user } }) => {
      return user;
    });
};

export const postCommentByVideoId = (video_id, newComment, username) => {
  return api.post(`/comments/${video_id}`, {
    body: newComment,
    username: username,
  });
};

export const getTags = () => {
  return api.get("/tags").then(({ data: { tags } }) => {
    return tags;
  });
};
