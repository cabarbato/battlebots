import { Container, Row, Col } from "react-bootstrap";
import Section from "../../components/Section";
import "./Sections.scss";

const Sections = (props) => (
  <Container fluid {...props} content>
    <Container>
      <Row>
        <Col xs={12} lg={8} className="px-5 mx-auto">
          {props.content.map((d, i) => (
            <Section
              {...d}
              key={`section-${d.title?.props.children[0]}_${i}`}
            />
          ))}
          {props.children}
        </Col>
      </Row>
    </Container>
  </Container>
);

export default Sections;
