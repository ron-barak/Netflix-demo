import SignIn from "./userComponents/signIn";
import SignUp from "./userComponents/signUp";
import Logout from "./userComponents/logout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../services/userService";

const HeaderNav = ({ userConnected, userUpdate }) => {
  const [state, setState] = useState({
    userInfo: "",
  });

  useEffect(() => {
    if (userConnected !== null) {
      const setData = async () => {
        const userInfo = await userService.userInfoByID(userConnected._id);
        setState({ userInfo });
      };
      setData();
    }
  }, [userConnected]);

  const { userInfo } = state;

  return (
    <nav className="header-nav container-fluid mt-2">
      <div className="row align-items-center">
        <div className="mr-auto p-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            style={{ width: "120px" }}
            alt="logo"
          />
        </div>

        {!userConnected && (
          <div className="p-2">
            <SignIn userUpdate={userUpdate} btnTxt="Sign in" />
            <SignUp />
          </div>
        )}
        {userConnected && (
          <div className="dropdown">
            <div
              className="dropdown-toggle text-white"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={userInfo.image}
                alt="user-img"
                className="rounded mr-1"
                style={{ width: "32px" }}
              />
            </div>
            <div
              className="dropdown-menu p-2 mt-2"
              aria-labelledby="dropdownMenu2"
            >
              <Link
                to="/profile"
                className="nav-link text-white p-2 dropdown-item "
              >
                <img
                  src={userInfo.image}
                  alt="user-img"
                  className="rounded mr-1"
                  style={{ width: "32px" }}
                />
                {userInfo.name}
              </Link>
              <Logout userUpdate={userUpdate} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default HeaderNav;
