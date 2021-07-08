import { Link } from "react-router-dom";

const Header = ({ path }) => {
  return (
    <nav className="header-background container-fluid pt-1">
      <div className="row align-items-center">
        <div className="mr-auto">
          <img
            src="https://i.pinimg.com/originals/05/2e/b9/052eb9b0d8387832a82a1412b65ccda2.png"
            style={{ width: "100px" }}
            alt=""
          />
        </div>
        <Link to={path} className="ml-auto">
          <button className="btn btn-danger py-0 px-3">
            <i
              style={{ fontSize: "26px" }}
              class="fas fa-long-arrow-alt-right"
            ></i>
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Header;
