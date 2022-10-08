import axios from 'axios';
import fire from '../fire';

const url = 'http://localhost:3001/api';

export const registerUser = async (firstName, lastName, email, password) => {
  const header = await createToken();
  const payload = {
    firstName,
    lastName,
    email,
    password
  }
  try {
    const res = await axios.post(url, payload, header);
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

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}