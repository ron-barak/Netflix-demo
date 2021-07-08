import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import UserMovies from "../movieComponents/user-movies";
import Header from "../common/header";

const Profile = () => {
  const [state, setState] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const setUserData = async () => {
      const userConnected = userService.getCurrentUser();
      const userInfo = await userService.userInfoByID(userConnected._id);
      setState(mapDataToState(userInfo));
    };
    setUserData();
  }, []);

  const mapDataToState = (data) => {
    return {
      _id: data._id,
      image: data.image,
      name: data.name,
      email: data.email,
      password: data.password,
    };
  };
  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      state.image = image;
    }
    if (password) {
      state.password = password;
    }
    await userService.editUser(state);
    toast.error("User successfully updated");
  };

  const { image, name, email, password } = state;
  return (
    <div className="profile-body">
      <Header path={"/"} />
      <div className="container mt-5">
        <div className="mx-auto" style={{ width: "600px" }}>
          <h1 className="display-3 ml-1">Edit Profile</h1>

          <div className="row">
            <div className="col-lg-3">
              <img
                src={image}
                className="rounded ml-1"
                style={{ width: "110px" }}
                alt="user-img"
              />
            </div>
            <div className="col-lg-9">
              <form onSubmit={doSubmit} className="form-row pt-2 pr-1">
                <button className="edit-btn btn btn-danger py-1">Save</button>
                <div className="col-lg-6">
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={name}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="image"
                    type="text"
                    className="form-control ml-1"
                    placeholder="Image"
                  />
                </div>

                <div className="col-lg-6 mt-3">
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                  />
                </div>
                <div className="col-lg-6 mt-3 ">
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control ml-1"
                    placeholder="Password"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <UserMovies />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
