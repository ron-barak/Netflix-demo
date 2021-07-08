import $ from "jquery";
import { useState } from "react";
import userService from "../../services/userService";
import formService from "../../services/formService";
import { toast } from "react-toastify";
import Joi from "joi-browser";

const SignUp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const [errorState, setErrorState] = useState({
    errors: {},
  });

  //--schema for validation--//
  const schema = {
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    image: Joi.string().min(11).max(1024),
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
    await userService.createUser(state);
    toast.error("The registration was successful");
  };

  const { errors } = errorState;
  const { password } = state;
  return (
    <>
      <button
        className="btn btn-danger ml-2 py-1"
        data-toggle="modal"
        data-target="#exampleModal3"
        data-whatever="@getbootstrap"
      >
        sign up
      </button>
      <div
        className="modal fade"
        id="exampleModal3"
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
          <div className="modal-content p-4">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalLabel">
                <i className="fas fa-user-plus text-white mx-2"></i> Sign up
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
              <form onSubmit={doSubmit}>
                <div className="form-group">
                  {formService.input("name", handleChange, errors)}
                  {formService.input("email", handleChange, errors)}
                  {formService.input(
                    "password",
                    handleChange,
                    errors,
                    password,
                    "password"
                  )}

                  {formService.input("image", handleChange, errors)}
                </div>
                <button
                  disabled={formService.validate(state, schema)}
                  className="btn btn-danger w-100 my-3"
                  onClick={() =>
                    $("#exampleModal3")
                      .modal("hide")
                      .on("hidden.bs.modal", function () {
                        $(this).find("textarea, input").val("").end();
                      })
                  }
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
