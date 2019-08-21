import axios from 'axios';
import config from '../config';

let token = null;
let callback = null;

function isLogin() {
  return !(token === null);
}
function getToken() {
  return token;
}
function setCallback(method) {
  callback = method;
}
/**
 *
 * @param userData
 * @param userData.username Username
 * @param userData.password Password
 */
async function logIn(userData) {
  const data = {
    username: userData.username,
    password: userData.password,
  };
  try {
    token = (await axios.post(`${config.apiUrl}admin/login`, data)).data;
    if (callback !== null) callback();
    axios.defaults.headers.common.auth_token = token;
    return token;
  } catch (e) {
    token = null;
    return null;
  }
}
function logOut() {
  token = null;
  axios.defaults.headers.common.auth_token = undefined;
}
export default {
  isLogin, logIn, logOut, getToken, setCallback,
};
