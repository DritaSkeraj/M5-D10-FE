import React from 'react'
import {Container, Row, Col, Form, Alert, Spinner} from 'react-bootstrap'

class AddComment extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        movieId:"",
      comment: {
        comment: "",
        rate: 0,
        elementId: "",
      },
      errMessage: "",
      loading: false,
    };
  }

  componentDidUpdate = async (prevProp, prevState) => {
    if (prevProp.movieId !== this.props.movieId) {
        this.setState({ movieId: this.props.movieId })
    }
  };
  updateCommentField = (e) => {
    let comment = { ...this.state.comment }; // creating a copy of the current state
    let currentId = e.currentTarget.id; // 'name', 'phone', etc.
    console.log("currentId: ", currentId);
    //reservation['phone'] --> reservation.phone = '3'
      comment[currentId] = e.currentTarget.value;
      comment.elementId = this.state.movieId;
      console.log(this.state.movieId)
      this.setState({ comment: comment });
      console.log(this.state.comment)
  };

    submitComment = async (e) => {
        let {movieId} = this.state
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: new Headers({
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2N2JhNTk4MzViMDAwMTc1ODRlZmMiLCJpYXQiOjE2MDU3OTQ3MjUsImV4cCI6MTYwNzAwNDMyNX0.ZBxn9E-dluFBsGqKAIwygPI84Tzr0ZI6d9U_RszFQw0",
            "Content-Type": "application/json",
          }),
        }
      );
      console.log("POST response, ", response);
      if (response.ok) {
        alert("yayyyy! commented successfully!");
        this.setState({
          comment: {
            comment: "",
            rate: 0,
            elementId: "",
          },
          errMessage: "",
          loading: false,
        });
          this.props.updateComments(true)

      } else {
        console.log("an error occurred");
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e); // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };

  render() {
    return (
      <Container>
        {this.state.errMessage && (
          <Alert variant="danger">
            We encountered a problem with your request.
            {this.state.errMessage}
          </Alert>
        )}
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Adding your comment, please wait
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        <Form className="w-100 mb-5" onSubmit={this.submitComment}>
          <Row>
            <img
              src={this.props.img}
              style={{ width: "30px", height: "30px", margin: "0 auto" }}
              alt="book cover"
            />
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label htmlFor="comment">Add comment: </Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  name="comment"
                  id="comment"
                  placeholder="Your comment"
                  required
                  value={this.state.comment.comment}
                  onChange={this.updateCommentField}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <Form.Label htmlFor="rate">Add rate: </Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  id="rate"
                  placeholder="1-5"
                  min="1"
                  max="5"
                  value={this.state.comment.rate}
                  onChange={this.updateCommentField}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <button className="btn-info offset-5" type="Submit">
                {" "}
                Submit{" "}
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddComment;