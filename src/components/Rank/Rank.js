import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => (
  <div>
    <p className="rank">
      {" "}
      {name}, your current rank is {entries}{" "}
    </p>
  </div>
);
export default Rank;
