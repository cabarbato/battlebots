import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCategory } from "../../actions";
import * as d3 from "d3";
import { Bar, withResponsiveness } from "britecharts-react";
import { Nav } from "react-bootstrap";
import "./Picker.scss";

const limit = 10,
  chart_id = "picker__chart",
  mapStateToProps = (state) => {
    return {
      category: state.categoryReducer.category,
    };
  },
  mapDispatchToProps = (dispatch) => {
    return {
      onSetCategory: (e) => dispatch(setCategory(e)),
    };
  };

const Picker = (props) => {
  const { onSetCategory } = props,
    initial_state = {
      data: [],
      selected: "top",
      width: 0,
    },
    [state, setState] = useState(initial_state),
    { data, selected, width } = state,
    ResponsiveBarChart = withResponsiveness(Bar);

  useEffect(() => {
    if (!data.length) {
      const width = document.getElementById(chart_id).clientWidth;
console.log(chart_id, width)
      d3.csv(props.dataset, (d) => ({
        ...d,
        value: +d.value,
      })).then((d) => {
        const data = d.sort((a, b) => (a.value > b.value ? 1 : -1));

        setState({ ...state, data, width });
      });
    }
  });

  let displayed_data = data.slice(
    selected === "top" ? data.length - limit : 0,
    selected === "bottom" ? limit - data.length : data.length
  );

  if (selected === "bottom") displayed_data.reverse();

  return (
    <div {...props} className="picker">
      <Nav
        variant="pills"
        defaultActiveKey={initial_state.selected}
        onSelect={(selected) => setState({ ...state, selected })}
      >
        <Nav.Item>
          <Nav.Link eventKey="top">Top {limit}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="bottom">Bottom {limit}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="all">All</Nav.Link>
        </Nav.Item>
      </Nav>
      <div id={chart_id}>
        {data && width ? (
          <ResponsiveBarChart
            isAnimated={true}
            xTicks={0}
            data={displayed_data}
            width={width}
            isHorizontal={true}
            betweenBarsPadding={0.3}
            colorSchema={["#92ff16"]}
            customClick={(d) => onSetCategory(d.name)}
            margin={{
              left: 80,
              right: 0,
              top: 40,
              bottom: 10,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
