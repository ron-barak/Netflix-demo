import MovieBox from "./movie-box";
import Hero from "../hero";
import MainNav from "../main-nav";
import HeaderNav from "../header-nav";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import userService from "../../services/userService";

const MovieContainer = () => {
  const [state, setState] = useState({
    movies: [],
  });

  const [userState, setUserState] = useState({
    userConnected: null,
  });

  useEffect(() => {
    setDataFromServer();
    userUpdate();
  }, []);

  const userUpdate = async () => {
    const userConnected = userService.getCurrentUser();
    setUserState({ userConnected });
  };

  const setDataFromServer = async () => {
    const movies = await movieService.getAll();
    setState({ movies });
  };

  const handleSearchField = async (val) => {
    const movies = await movieService.searchMovie(val);
    setState({ movies });
  };

  const orderBySelectVal = async (val) => {
    const movies = await movieService.orderBy(val);
    setState({ movies });
  };

  const { movies } = state;
  const { userConnected } = userState;

  return (
    <>
      <HeaderNav userUpdate={userUpdate} userConnected={userConnected} />
      <Hero />
      <div className="container">
        <MainNav
          userConnected={userConnected}
          setDataFromServer={setDataFromServer}
          handleSearchField={handleSearchField}
          orderBySelectVal={orderBySelectVal}
        />
        <div className="row pt-5">
          <MovieBox movies={movies} />
        </div>
      </div>
    </>
  );
};
export default MovieContainer;
