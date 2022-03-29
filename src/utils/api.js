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

export const postCloudinary = (url, formData) => {
  return fetch(url + `/upload`, {
    method: "post",
    body: formData,
  }).then((res) => res.json());
};
export const deleteCloudinary = (url, formData) => {
  return fetch(url + `/delete_by_token`, {
    method: "post",
    body: { token: delete_token },
  })
    .then((res) => {
      console.log(res);
      console.log("video deleted");
    })
    .catch(console.log);
};

export const postVideoToDatabase = (returnData, url, formData) => {
  console.log(returnData);
  // return api
  //   .post("/videos", returnData)
  //   .then(() => {
  //     console.log("posted");
  //   })

  return Promise.reject({ msg: "post failed" }).catch((err) => {
    console.log(err);
    return deleteCloudinary(url, formData);
  });
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
