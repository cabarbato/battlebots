import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const  mapStateToProps = (state) => {
  return {
    category: state.categoryReducer.category,
  };
};

const Robots = (props) => {
  return (
    <Container fluid {...props}>
      <Container>
        <Row>
          <Col className="robots">
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps)(Robots);