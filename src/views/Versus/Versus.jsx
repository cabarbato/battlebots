import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import * as d3 from "d3";
import { Donut, withResponsiveness } from "britecharts-react";
import { colors } from "britecharts";
import { Container, Row, Col } from "react-bootstrap";
import "./Versus.scss";

const mapStateToProps = (state) => {
  return {
    category: state.categoryReducer.category,
  };
};

const Robots = (props) => {
  const { category } = props,
    initial_state = {
      opponent: "test",
    },
    [state, setState] = useState(initial_state),
    { opponent } = state,
    ResponsiveDonut = withResponsiveness(Donut);
  return (
    <Container fluid {...props}>
      <Container>
        <Row>
          <Col xs={12} lg={8} className="versus px-5 mx-auto">
            <h2>
              {category} VS
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>{opponent ? <ResponsiveDonut data={[]} /> : null}</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default connect(mapStateToProps)(Robots);
