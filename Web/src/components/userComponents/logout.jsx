const Logout = ({ userUpdate }) => {
  return (
    <div
      className="dropdown-item text-center border-top"
      onClick={() => {
        localStorage.removeItem("token");
        userUpdate();
      }}
    >
      Log out
      <i className="fas fa-sign-out-alt ml-1"></i>
    </div>
  );
};
export default Logout;
