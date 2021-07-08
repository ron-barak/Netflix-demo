import http from "./http";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

//---LOGIN---//
const login = async ({ email, password }) => {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
};

//---CREATE USER---//
const createUser = (user) => {
  return http.post(`${apiUrl}/user`, user);
};

//---USER INFO BY ID---//
const userInfoByID = (_id) => {
  return http.get(`${apiUrl}/user/${_id}`).then((resp) => resp.data);
};

//---CURRENT USER FROM LOCALSTORAGE---//
const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
};

//---ONLINE USER INFO---//
const userInfo = () => {
  return http.get(`${apiUrl}/user/me`).then((resp) => resp.data);
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

//---EDITE USER---//
const editUser = (user) => {
  const userId = user._id;
  delete user._id;
  return http.put(`${apiUrl}/user/${userId}`, user);
};

const service = {
  login,
  createUser,
  getCurrentUser,
  userInfo,
  getJwt,
  userInfoByID,
  editUser,
};
export default service;
