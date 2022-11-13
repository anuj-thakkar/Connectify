import axios from 'axios';
import fire from '../fire';

const url = 'http://localhost:3001/api';

export const registerUser = async (username, name, email, password) => {
  const payload = {
    username,
    name,
    email
  }
  console.log(payload);
  try {
    const res = await axios.post(url, payload);
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
    const res = await axios.get(searchUrl, payload, header);
  } catch (e) {
    console.error(e);
  }
}

export async function login(email) {
  const header = await createToken();
  const loginUrl = 'http://localhost:3001/api/login';
  alert("logging in");
  const body = {
    email
  }
  try {
    var result = await axios.post(loginUrl, body, header);
    console.log(result);
    console.log(result.data);
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