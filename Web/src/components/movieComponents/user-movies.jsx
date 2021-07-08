import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import { Link } from "react-router-dom";

const UserMovies = () => {
  const [state, setState] = useState({
    movies: [],
  });

  useEffect(() => {
    const setUserData = async () => {
      const movies = await movieService.userMovies();
      setState({ movies });
    };
    setUserData();
  }, []);

  const { movies } = state;

  return movies.map((item) => {
    return (
      <Link
        key={item._id}
        to={`movie/${item._id}`}
        className="movie-box-profile col-lg-3 mt-4"
      >
        <i className="fas fa-edit text-white"></i>
        <img
          className="movie-sm-img w-100"
          src={item.poster_path}
          alt="movie-img"
        />
      </Link>
    );
  });
};

export default UserMovies;
