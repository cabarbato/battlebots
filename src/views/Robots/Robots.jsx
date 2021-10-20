import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import "./Robots.scss";

const interval = 10000,
  mapStateToProps = (state) => {
    return {
      category: state.categoryReducer.category,
    };
  };

const Robots = (props) => {
  const { category } = props;
  return (
    <Container fluid {...props}>
      <Container>
        <Row>
          <Col xs={12} lg={8} className="robots px-0 mx-auto">
            <h2 className="mx-5">{category} Bots</h2>
            <Carousel>
              <Carousel.Item interval={interval}>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x350"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={interval}>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x350"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps)(Robots);
