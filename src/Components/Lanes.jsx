import React from "react";
import PropTypes from "prop-types";
import Lane from "./Lane";
import NewLane from "./NewLane";

const Lanes = (props) => {
  return (
    <ul className="h-full py-8 flex">
      <Lane />
      <NewLane />
    </ul>
  );
};

Lanes.propTypes = {};

export default Lanes;
