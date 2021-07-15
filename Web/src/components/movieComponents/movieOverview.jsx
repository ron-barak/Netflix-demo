import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieService from "../../services/movieService";
import Header from "../common/header";

const MovieOverview = () => {
  const [state, setState] = useState({
    moviesInfo: "",
  });
  const { id } = useParams();
  const { moviesInfo } = state;

  useEffect(() => {
    const setDataFromState = async () => {
      let moviesInfo = await movieService.getMovieByID(id);
      setState({ moviesInfo });
    };
    setDataFromState();
  }, [id]);

  const renderStars = () => {
    const elements = [];
    for (let i = 1; i < moviesInfo.vote_average; i++) {
      elements.push(<i key={i} className="far fa-star mr-1"></i>);
    }
    return elements;
  };

  return (
    <>
      <div className="w-100" style={{ position: "absolute" }}>
        <Header path="/"></Header>
      </div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${moviesInfo.backdrop_path})`,
        }}
      >
        <div className="row align-items-center h-100">
          <div className="col-lg-6">
            <div className="pl-5 text-left">
              <h1 className="overview-title">{moviesInfo.title}</h1>
              <p className="w-75 mr-auto ">{moviesInfo.overview}</p>
              <p>{moviesInfo.release_date}</p>
              {renderStars()}
              <div>
                <button
                  data-fancybox="video2"
                  href={moviesInfo.video}
                  data-vbtype="video"
                  data-autoplay="true"
                  className="btn btn-light mt-3 px-4"
                >
                  <i className="fas fa-play mr-2"></i> Play
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="age-overview ml-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png"
                alt=""
                style={{ width: "12px", marginRight: "10px" }}
              />
              18+
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MovieOverview;
