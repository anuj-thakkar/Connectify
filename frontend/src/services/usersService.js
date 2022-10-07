import axios from 'axios';

const url = 'http://localhost:3001/api';

export const registerUser = (firstName, lastName, email, password) => {
  const payload = {
    firstName,
    lastName,
    email,
    password
  }
  console.log(firstName,
    lastName,
    email,
    password);
  axios.post(url, payload);
};