import React from 'react'
import { Spinner } from 'react-bootstrap'

import Comment from './Comment';

class CommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: true,
            movieId: "",
            updateComment: false
        }
    }

      componentDidUpdate = async (prevProp, prevState) => {
          if (prevProp.movieId !== this.props.movieId) {
              await this.setState({ movieId: this.props.movieId });
              await this.fetchComments();
              console.log(this.state.comments);
          }
          if (this.state.updateComment == true) {
              await this.fetchComments();
              this.setState({ updateComment: false })

          }
          if (this.props.updateComState ) {
            await this.fetchComments();
            this.props.updateComments(false);
          }
      }
  

  fetchComments = async () => {
    let { movieId } = this.state;
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + movieId,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2N2JhNTk4MzViMDAwMTc1ODRlZmMiLCJpYXQiOjE2MDU3OTQ3MjUsImV4cCI6MTYwNzAwNDMyNX0.ZBxn9E-dluFBsGqKAIwygPI84Tzr0ZI6d9U_RszFQw0",
          },
        }
      );
      let comments = await response.json();
      this.setState({ comments: comments, loading: false });
    } catch (e) {
      console.log("error happened, that's life", e);
      this.setState({ loading: false });
    }
  };
  
  handleCommentDelete = async (id) => {
    let objToDelete = id;
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          objToDelete,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2N2JhNTk4MzViMDAwMTc1ODRlZmMiLCJpYXQiOjE2MDU3OTQ3MjUsImV4cCI6MTYwNzAwNDMyNX0.ZBxn9E-dluFBsGqKAIwygPI84Tzr0ZI6d9U_RszFQw0",
          },
        }
      );
      let deletedComment = await response.json();
        console.log(response);
        if (response.ok) {
            this.setState({updateComment:true})
        } else{}
      // let newComments = this.state.comments.splice(index, 1);

      let newComments = this.state.comments.filter(
        (obj) => obj !== objToDelete
      );
      console.log("comments without the deleted one: ", newComments);
      this.setState({ comments: newComments });
    } catch (e) {
      console.log("error at deleting, ", e);
    }
  };

  render() {
    return (
      <div className="mb-5">
        <h2>Comments: </h2>
        {this.state.loading && (
          <div className="font-bold d-flex justify-content-center">
            <span>Feching comments</span>
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {this.state.comments.map((comments, index) => (
          <Comment
            key={index}
            comments={comments}
            handleDel={this.handleCommentDelete}
          />
        ))}
      </div>
    );
  }
}

export default CommentsList;