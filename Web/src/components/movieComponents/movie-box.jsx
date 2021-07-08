import { Link } from "react-router-dom";

const MovieBox = ({ movies }) => {
  return (
    <>
      {!movies.length ? (
        <div
          className="text-center mx-auto text-secondary mb-5"
          style={{ marginTop: "50px" }}
        >
          <i
            className="far fa-address-card p-2"
            style={{ fontSize: "50px" }}
          ></i>
          <p style={{ fontSize: "30px" }}>No results</p>
          <p>Your search did not have any matches</p>
        </div>
      ) : (
        movies.map((item) => {
          return (
            <Link
              to={`/overview/${item._id}`}
              key={item._id}
              className="col-lg-2 mb-5"
            >
              <div className="movie-box">
                <img className="w-100" src={item.poster_path} alt="movie-img" />
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};
export default MovieBox;
