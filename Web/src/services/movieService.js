import http from "./http";
import { apiUrl } from "../config.json";

//----GET ALL----//
const getAll = () => {
  return http.get(`${apiUrl}/movie/`).then((resp) => resp.data);
};

//----GET INFO BY ID----//
const getMovieByID = (_id) => {
  return http.get(`${apiUrl}/movie/${_id}`).then((resp) => resp.data);
};

//----CREACTE MOVIE----//
const createMovie = (movie) => {
  return http.post(`${apiUrl}/movie/`, movie);
};

//----SEARCH----//
const searchMovie = (val) => {
  return http.get(`${apiUrl}/movie/search?q=${val}`).then((resp) => resp.data);
};

//----ORDER BY----//
const orderBy = (val) => {
  return http.get(`${apiUrl}/movie?sort=${val}`).then((resp) => resp.data);
};

//----USER MOVIES----//
const userMovies = () => {
  return http.get(`${apiUrl}/movie/user-movie`).then((resp) => resp.data);
};

//----EDIT MOVIE----//
const editMovie = (movie) => {
  let movieID = movie._id;
  delete movie._id;
  return http.put(`${apiUrl}/movie/edit/${movieID}`, movie);
};

//----DELETE MOVIE----//
const deleteMovie = (_id) => {
  return http.delete(`${apiUrl}/movie/${_id}`);
};
const service = {
  getAll,
  getMovieByID,
  createMovie,
  searchMovie,
  orderBy,
  userMovies,
  editMovie,
  deleteMovie,
};
export default service;
