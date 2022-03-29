import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-portfolio-app.herokuapp.com/api",
});

export const getVideos = (topic, sortBy, orderBy) => {
  return api.get(`/videos`).then(({ data: videos }) => videos);
};

export const patchVotesByVideoId = (vote, video_id) => {
  return api.patch(`/videos/${video_id}`, { vote: vote });
};

export const GetCommentsByVideoId = (video_id) => {
  return api.get(`/comments/${video_id}`);
};

export const postCommentByVideoId = (video_id, newComment, username) => {
  return api.post(`/comments/${video_id}`, {
    body: newComment,
    username: username,
  });
};
