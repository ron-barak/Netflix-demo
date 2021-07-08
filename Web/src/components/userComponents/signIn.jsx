import $ from "jquery";
import { useState } from "react";
import userService from "../../services/userService";
import formService from "../../services/formService";
import { toast } from "react-toastify";
import Joi from "joi-browser";

const SignIn = ({ userUpdate, btnTxt }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState({
    errors: {},
  });

  //--schema for validation--//
  const schema = {
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
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
    await userService.login(state);
    toast.error("Welcome back");
    userUpdate();
  };

  const { errors } = errorState;
  return (
    <>
      <button
        className="btn btn-danger py-1 "
        data-toggle="modal"
        data-target="#exampleModal2"
        data-whatever="@fat"
      >
        {btnTxt}
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
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
                <i className="fas fa-user text-white mx-2"></i> Sign In
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
              <form noValidate onSubmit={doSubmit}>
                <div className="form-group">
                  {formService.input("email", handleChange, errors)}
                  {formService.input(
                    "password",
                    handleChange,
                    errors,
                    state.password,
                    "password"
                  )}
                </div>
                <button
                  disabled={formService.validate(state, schema)}
                  className="btn btn-danger w-100 my-3"
                  onClick={() => {
                    $("#exampleModal2")
                      .modal("hide")
                      .on("hidden.bs.modal", function () {
                        $(this).find("textarea, input").val("").end();
                      });
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
