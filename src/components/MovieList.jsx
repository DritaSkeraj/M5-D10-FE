import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import ModalMovie from './ModalMovie'
import MoviesRow from './MoviesRow'

export default class MovieList extends Component {
  state = {
    show: false,
    currentMovie: [],
  };
  componentDidMount = (movie) => {};
    handleOpenModal = async (movieId) => {
    this.setState({ show: true, currentMovie: movieId });
    };
    
    handleCloseModal = () => {  
    this.setState({ show: false, currentMovie:"" });
    };
    



  render() {
    let { show, currentMovie } = this.state;
    return (
      <div>
        <MoviesRow handleOpenModal={this.handleOpenModal} query={"List of movies:"} />
    
          <ModalMovie
            handleClose={this.handleCloseModal}
            show={show}
            currentMovie={[...currentMovie]}
        ></ModalMovie>
      </div>
    );
  }
}
