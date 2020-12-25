import React, { Component } from 'react'
import { Container, Row, Col, Button, FormControl } from "react-bootstrap";
import "../styles/SingleMoviePage.css";
import { withRouter } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AddComment from './AddComment';
import CommentsList from './CommentsList'

class SinlgeMoviePage extends Component {
  state = {
    currentMovie: {},
    updateComments:'false'
    
  };
  componentDidMount = async () => {
    try {
      await this.fetchMovies(this.props.match.params.id);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };
  
  be_url = process.env.REACT_APP_BE_URL;

  fetchMovies = async (q) => {
    let baseUrl = "http://www.omdbapi.com/";
    let apiKey = process.env.REACT_APP_API_KEY;
    try {
      let res = await fetch(`${baseUrl}?i=${q}&apikey=${apiKey}`, {
        method: "GET",
      });
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        console.log(typeof data);
        this.setState({ currentMovie: data });
      }
    } catch (e) {
      console.log(e);
    }
  };
  updateComments = (param) => {
    this.setState({updateComments:param})
  
}
  render() {
    let { currentMovie } = this.state;
    return (
      <Container className="my-3 singleMoviePage">
        <Row>
          <Col md={3} className="d-flex align-items-center">
            <img
              src={currentMovie.Poster}
              className="img-fluid singleMoviePage__img"
              alt=""
            />
          </Col>
          <Col md={9}>
            <Row className="divider py-4">
              <Col
                sm={8}
                className="d-flex flex-column align-items-start divider"
              >
                <h3>{currentMovie.Title}</h3>
                <h6 className="mb-2">
                  {currentMovie.Year} - {currentMovie.Genre} -{" "}
                  {currentMovie.Runtime}{" "}
                </h6>

                <span className="d-flex mb-4">
                  {Array(5)
                    .fill("")
                    .map((item) => (
                      <StarIcon style={{ color: "#ffc107" }} />
                    ))}
                </span>
                <p> {currentMovie.Plot}</p>
                <Row className="d-flex flex-column align-items-start divider py-4">
                  <div className="mt-4 singleMovie__icons">
                    <PlayCircleFilledIcon
                      className="mr-3 ml-3"
                      style={{ fontSize: "2em" }}
                    />
                    <PlaylistAddIcon
                      className="mr-3"
                      style={{ fontSize: "2em" }}
                    />
                    <AddCommentIcon style={{ fontSize: "2em" }} />
                  </div>
                </Row>
              </Col>

              <Col>
                {" "}
                <h6 className="mb-2">
                  <span className="details__span">Director:</span>{" "}
                  {currentMovie.Director}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Writer:</span>{" "}
                  {currentMovie.Writer}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Actors:</span>{" "}
                  {currentMovie.Actors}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Rated:</span>{" "}
                  {currentMovie.Rated}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Released:</span>{" "}
                  {currentMovie.Released}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Country:</span>{" "}
                  {currentMovie.Country}
                </h6>
                <h6 className="mb-2">
                  <span className="details__span">Languages</span>{" "}
                  {currentMovie.Language}
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <CommentsList
            movieId={currentMovie.imdbID}
            updateComState={this.state.updateComments}
            updateComments={this.updateComments}
          />
          </Col>
          <Col md={6}>
          <AddComment
            img={currentMovie.Poster}
            movieId={currentMovie.imdbID}
            updateComments={this.updateComments}
          />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default withRouter(SinlgeMoviePage)