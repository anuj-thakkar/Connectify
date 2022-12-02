import axios from 'axios';
import fire from '../fire';

const url = 'http://localhost:3001/api';

export const registerUser = async (username, name, email) => {
  const registerUserUrl = 'http://localhost:3001/api/register';
  const payload = {
    username,
    name,
    email
  }
  console.log(payload);
  try {
    const res = await axios.post(registerUserUrl, payload);
    console.log(res.data);
    return res.data;
} catch (e) {
    console.error(e);
  }
};

export const getRegisteredUserEntries = async () => {
  const header = await createToken();
  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export const searchForUsers = async (username) => {
  const header = await createToken();
  const searchUrl = 'http://localhost:3001/api/search';
  const payload = {
    username
  }
  try {
    console.log(searchUrl, payload);
    var res = await axios.get(searchUrl, payload, header);
    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
}

export async function login(email) {
  const header = await createToken();
  const loginUrl = 'http://localhost:3001/api/login';
  const body = {
    email
  }
  try {
    var result = await axios.post(loginUrl, body, header);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserInfo(username) {
  const header = await createToken();
  const userInfoURL= 'http://localhost:3001/api/userInfo';
  const body = {
    username
  }
  console.log(username);
  try {
    var result = await axios.post(userInfoURL, body, header);
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateEmail(email, newEmail) {
  const header = await createToken();
  const updateEmailUrl = 'http://localhost:3001/api/updateEmail';
  const body = {
    email,
    newEmail
  }
  try {
    var result = await axios.post(updateEmailUrl, body, header);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateUsername(email, username) {
  const header = await createToken();
  const updateUsernameUrl = 'http://localhost:3001/api/updateUsername';
  const body = {
    email,
    username
  }
  try {
    var result = await axios.post(updateUsernameUrl, body, header);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

export async function createPost(postedBy, title, text) {
  const header = await createToken();
  const createPost = 'http://localhost:3001/posts/createPost';
  const body = {
    postedBy,
    title,
    text
  }

  try {
    var result = await axios.post(createPost, body, header);
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

export const getPosts = async () => {
  const header = await createToken();
  const createPost = 'http://localhost:3001/posts';
  try {
    const res = await axios.get(createPost, header);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export async function deletePost(postId) {
  const header = await createToken();
  const deletePostUrl = 'http://localhost:3001/posts/deletePost';
  const body = {
    postId
  }
  try {
    const res = await axios.post(deletePostUrl, body, header);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export async function likePost(postId) {
  const header = await createToken();
  const likePostUrl = 'http://localhost:3001/posts/likePost';
  const body = {
    postId
  }
  try {
    const res = await axios.post(likePostUrl, body, header);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateFavSong(email, newFavSong) {
  const header = await createToken();
  const updateFavSongUrl = 'http://localhost:3001/api/updateFavSong';
  const body = {
    email,
    newFavSong
  }
  try {
    var result = await axios.post(updateFavSongUrl, body, header);
    return result.data;
  } catch (e) {
    console.error(e);
  }
}

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = await user.getIdToken();
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}