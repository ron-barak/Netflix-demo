import $ from "jquery";
import { useState } from "react";
import movieService from "../../services/movieService";
import formService from "../../services/formService";
import SignIn from "../userComponents/signIn";
import { toast } from "react-toastify";
import Joi from "joi-browser";

const CreateMovie = ({ setDataFromServer, userConnected }) => {
  const [state, setState] = useState({
    overview: "",
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    title: "",
    video: "",
    vote_average: "",
  });
  const [errorState, setErrorState] = useState({
    errors: {},
  });

  //--schema for validation--//
  const schema = {
    title: Joi.string().min(2).max(255).required(),
    video: Joi.string().min(2).max(1024).required(),
    poster_path: Joi.string().min(2).max(1024).required(),
    backdrop_path: Joi.string().min(2).max(1024).required(),
    overview: Joi.string().min(2).max(1024).required(),
    release_date: Joi.string().min(1).max(1024).required(),
    vote_average: Joi.string().min(1).max(1024).required(),
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
    await movieService.createMovie(state);
    setDataFromServer();
    toast.error("A new movie was created successfully");
  };

  const { errors } = errorState;
  const { release_date } = state;

  return (
    <>
      {userConnected && (
        <>
          <button
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#exampleModal"
            data-whatever="@mdo"
          >
            Add new movie <i className="fas fa-plus"></i>
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog"
              style={{ marginTop: "150px" }}
              role="document"
            >
              <div className="modal-content px-4">
                <div className="modal-header">
                  <h5 className="modal-title text-white" id="exampleModalLabel">
                    Create new Movie
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i
                      aria-hidden="true"
                      className="fas fa-times text-white mt-1"
                    ></i>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => doSubmit(e)}>
                    <div className="form-group">
                      {formService.input("title", handleChange, errors)}
                      {formService.input("poster_path", handleChange, errors)}
                      {formService.input("backdrop_path", handleChange, errors)}
                      {formService.input(
                        "release_date",
                        handleChange,
                        errors,
                        release_date,
                        "date"
                      )}
                      {formService.input("video", handleChange, errors)}

                      <input
                        onChange={handleChange}
                        name="vote_average"
                        type="number"
                        className="form-control"
                        placeholder="vote average"
                        min="1"
                        max="10"
                      />
                    </div>
                    <textarea
                      onChange={handleChange}
                      rows="4"
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      placeholder="Overview"
                      name="overview"
                    />
                    <button
                      disabled={formService.validate(state, schema)}
                      className="btn btn-danger w-100 my-3"
                      onClick={() =>
                        $("#exampleModal")
                          .modal("hide")
                          .on("hidden.bs.modal", function () {
                            $(this).find("textarea, input").val("").end();
                          })
                      }
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!userConnected && <SignIn btnTxt="Add new movie" />}
    </>
  );
};
export default CreateMovie;
