import "./App.css";
import MovieContainer from "./components/movieComponents/movieContainer";
import { Route, Switch } from "react-router-dom";
import MovieOverview from "./components/movieComponents/movieOverview";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/userComponents/Profile";
import EditMovie from "./components/movieComponents/editMovie";

const App = () => {
  return (
    <div className="App">
      <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
      <main>
        <Switch>
          <Route exact path="/" component={MovieContainer} />
          <Route exact path="/overview/:id" component={MovieOverview} />
          <Route exact path="/movie/:id" component={EditMovie} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
