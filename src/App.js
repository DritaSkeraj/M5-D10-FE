import { Modal } from "react-bootstrap";
import MovieList from "./components/MovieList";
import ModalMovie from "./components/ModalMovie";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Link, Route, Switch } from "react-router-dom";
import SinlgeMoviePage from "./components/SinlgeMoviePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <MovieList />
          {/* <ModalMovie />   */}
        </Route>
        <Route exact path="/movie/:id">
          <SinlgeMoviePage />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;


{/*"start": "serve -s build",*/}