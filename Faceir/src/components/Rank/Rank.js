import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => (
	<div>
		<p className="rank">
			{" "}
			{name}, your current rank is {entries}{" "}
		</p>
		<p className="description"> Yo, this shit is crazy, check it out </p>
	</div>
);
export default Rank;
