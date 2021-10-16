import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import { Bar, withResponsiveness } from "britecharts-react";
import { colors } from "britecharts";
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
          <Col className="versus">
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps)(Robots);
