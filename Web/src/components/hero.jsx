const Hero = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner mx-auto">
        <div className="carousel-title w-100 text-center text-white">
          <h1>
            Unlimited movies, TV<br></br> shows, and more.
          </h1>
          <h3>Watch anywhere. Cancel anytime.</h3>
          <div
            data-fancybox="video2"
            href="https://www.youtube.com/watch?v=sY2djp46FeY"
            className=" play-btn"
            data-vbtype="video"
            data-autoplay="true"
          ></div>
        </div>
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://cdn.mos.cms.futurecdn.net/4cKiEja4EXhGhqyA4LhjmE.png"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://help.nflxext.com/7ac9b493-ae69-431a-923d-3cb8a79d7e63_what_is_netflix_3_en.png"
            alt="Third slide"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
