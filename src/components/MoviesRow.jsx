import React, { Component } from "react";
import { Row, Button, Carousel, Col, Card } from "react-bootstrap";
import "../styles/MovieRow.css";
import SortIcon from "@material-ui/icons/Sort";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default class MoviesRow extends Component {
  state = {
    movies: [],
    sorted: true,
  };
  componentDidMount = async () => {
    await this.fetchMovies();
    console.log(this.state.movies);
  };
  // componentDidMount = async () => {
  //   if(this.state.sorted)
  //   {await this.fetchMovies(this.props.query);
  //   console.log(this.state.movies);}
  // };
  sortByYear = () => {
    let { movies } = this.state;
    let moviesByYear = movies.sort(
      (movie1, movie2) => movie1.Year - movie2.Year
    );
    this.setState({ movies: moviesByYear, sorted: true });
  };

  fetchMovies = async () => {
    let baseUrl = `http://127.0.0.1:3000/media`;
    {/*let apiKey = `apikey=e88d2a55&`;*/}
    try {
      let res = await fetch(`${baseUrl}`, {
        method: "GET",
      });
      if (res.ok) {
        let data = await res.json();
        this.setState({ movies: data });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
    // };
    let { movies } = this.state;
    return (
      <Row className="my-4 mx-4 no-gutters">
        <Row className="d-flex justify-content-between w-100">
          <h3 className="mx-3 movieRowTitle text-capitalize text-white">
            {this.props.query}
          </h3>
          <SortIcon
            onClick={() => this.sortByYear()}
            style={{ color: "white", cursor: "pointer" }}
          />
        </Row>
        <Row>
          {movies.map((movie) => (
            <Col
              xs={12}
              md={4}
              lg={3}
              xl={2}
              className="my-4"
              key={movie.imdbID}
            >
              <Card style={{ width: "15rem" }}>
                <a onClick={() => this.props.handleOpenModal(movie.imdbID)}>
                  <Card.Img variant="top" src={movie.Poster} />{" "}
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    );
  }
}
