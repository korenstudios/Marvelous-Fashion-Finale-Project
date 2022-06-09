import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

httpService.setDefaultCommonHeaders("x-auth-token", getJwt());

export function createUser(user) {
  return httpService.post(`${config.apiUrl}/users`, user);
}

export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  });

  localStorage.setItem(TOKEN_KEY, data.token);
}

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getUsers() {
  return httpService.get(`${config.apiUrl}/users`);
}

export function getUserInfo() {
  return httpService.get(`${config.apiUrl}/users/info`);
}

export function editUser(id, user) {
  return httpService.put(`${config.apiUrl}/users/profile/${id}`, user);
}

export function forgotPassword(email) {
  return httpService.post(`${config.apiUrl}/auth/forgot-password`, {
    email,
  });
}

export function resetPassword(password, confirm_password, token) {
  return httpService.post(`${config.apiUrl}/auth/reset-password`, {
    password,
    confirm_password,
    token,
  });
}

export function getSocialMediaUser() {
  return httpService.get(`${config.apiUrl}/auth/login-social-media/success`, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
}

export function editStatus(id, status) {
  return httpService.patch(`${config.apiUrl}/users/status/${id}`, {
    isAdmin: status,
  });
}

export function removeUser(id) {
  return httpService.delete(`${config.apiUrl}/users/${id}`);
}

const usersService = {
  createUser,
  login,
  getJwt,
  logout,
  getUser,
  getUsers,
  getUserInfo,
  editUser,
  editStatus,
  removeUser,
  forgotPassword,
  resetPassword,
  getSocialMediaUser,
};

export default usersService;
