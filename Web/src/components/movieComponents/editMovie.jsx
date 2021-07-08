import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import movieService from "../../services/movieService";
import formService from "../../services/formService";
import Header from "../common/header";
import Joi from "joi-browser";

const EditMovie = () => {
  const [state, setState] = useState({
    overview: "",
    poster_path: "",
    release_date: "",
    title: "",
    video: "",
    vote_average: "",
  });
  const [errorState, setErrorState] = useState({
    errors: {},
  });

  const { id } = useParams();
  const history = useHistory();

  //--schema for validation--//
  const schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).max(255).required(),
    video: Joi.string().min(2).max(1024).required(),
    poster_path: Joi.string().min(2).max(1024).required(),
    overview: Joi.string().min(2).max(1024).required(),
    release_date: Joi.string().min(1).max(1024).required(),
    vote_average: Joi.string().min(1).max(1024).required(),
  };

  useEffect(() => {
    const setMovieData = async () => {
      const movieInfo = await movieService.getMovieByID(id);
      setState(mapDataToState(movieInfo));
    };
    setMovieData();
  }, [id]);

  const mapDataToState = (data) => {
    return {
      _id: data._id,
      overview: data.overview,
      poster_path: data.poster_path,
      release_date: data.release_date,
      title: data.title,
      video: data.video,
      vote_average: data.vote_average,
    };
  };
  const handleChange = ({ target: { name, value } }) => {
    //--validation-->
    const updatedErrors = { ...errors };
    const errorMessage = formService.validateProperty(name, value, schema);
    updatedErrors[name] = errorMessage;

    setState({ ...state, [name]: value });
    setErrorState({ errors: updatedErrors });
  };

  const doSubmit = async (e) => {
    e.preventDefault();

    //--validation--//
    const errors = formService.validate(state, schema);
    setErrorState({ errors: errors || {} });
    if (errors) {
      return;
    }
    await movieService.editMovie(state);
    history.replace("/profile");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await movieService.deleteMovie(id);
      history.replace("/profile");
    }
  };

  const { overview, poster_path, release_date, title, video, vote_average } =
    state;
  const { errors } = errorState;

  return (
    <div className="profile-body">
      <Header path={"/profile"} />
      <div className="container">
        <div className="mx-auto" style={{ width: "600px" }}>
          <h1 className="display-3">Edit Movie</h1>
          <form>
            <div className="form">
              <div className="border-bottom border-secondary mb-3 pb-2">
                <label>Movie itle:</label>
                {formService.input("title", handleChange, errors, title)}
              </div>
              <div className="border-bottomb order-secondary mb-3 pb-2">
                <label>Poster path:</label>
                {formService.input(
                  "poster_path",
                  handleChange,
                  errors,
                  poster_path
                )}
              </div>
              <div className="border-bottom border-secondary mb-3 pb-2">
                <label>Release date:</label>
                {formService.input(
                  "release_date",
                  handleChange,
                  errors,
                  release_date
                )}
              </div>
              <div className="border-bottom border-secondary mb-3 pb-2">
                <label>Votea verage:</label>
                {formService.input(
                  "vote_average",
                  handleChange,
                  errors,
                  vote_average
                )}
              </div>
              <div className="border-bottom border-secondary mb-3 pb-2">
                <label>Video:</label>
                {formService.input("video", handleChange, errors, video)}
              </div>
              <div className="mb-3 pb-2">
                <textarea
                  onChange={handleChange}
                  rows="6"
                  autoComplete="off"
                  type="text"
                  className="form-control "
                  placeholder="Overview"
                  name="overview"
                  value={overview}
                />
              </div>
            </div>
          </form>
          <div className="btns mt-2 pb-5">
            <button onClick={doSubmit} className="btn btn-light mr-2 py-1 px-4">
              Save
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger mr-2 py-1 px-4"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditMovie;
