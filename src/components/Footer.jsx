import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CopyrightIcon from "@material-ui/icons/Copyright";
import "../style/Footer.css";
// import { FaFacebookSquare } from "fontawesome";
// import "../style/Footer.css";
class footer extends React.Component {
  render() {
    return (
      <Container id="footer" fluid>
        <Col md={{ span: 8, offset: 2 }}>
          <Row id="footer-sns" className={"py-2"}>
            <FacebookIcon
              className="mx-1"
              style={{ color: "#3b5998" }}
              fontSize="large"
            />
            <TwitterIcon
              className="mx-1"
              style={{ color: "#1da1f2" }}
              fontSize="large"
            />
            <InstagramIcon
              className="mx-1"
              style={{ color: "#e1306c" }}
              fontSize="large"
            />
            <YouTubeIcon
              className="mx-1"
              style={{ color: "#ff0000" }}
              fontSize="large"
            />
          </Row>
          <Row id="footer-col">
            <Col xs={6} md={3}>
              <p>
                Audio and Subtitles
                <br />
                Media Center
                <br />
                Privacy <br />
                Contact Us <br />
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p>
                Audio Description <br />
                Investor Relations
                <br />
                Legal Notices <br />
                <br />
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p>
                Help Center
                <br />
                Jobs
                <br />
                Cookie Preferences
                <br />
                <br />
              </p>
            </Col>
            <Col xs={6} md={3}>
              <p>
                Gift Cards
                <br />
                Terms of Use
                <br />
                Corporate Information <br />
                <br />
              </p>
            </Col>
          </Row>
          <Button variant="outline-dark">Service Code</Button>
          <Row className={"my-3"}>
            <CopyrightIcon style={{ color: "grey" }} />{" "}
            <span>Just another netflix clone 2020</span>
          </Row>
        </Col>
      </Container>
    );
  }
}
export default footer;
