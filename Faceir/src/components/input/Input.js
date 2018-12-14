import React from "react";
import "./input.css";

const Input = ({ handleChange, handleSubmit }) => (
	<div className="input-container">
		<input
			className="input"
			placeholder="put your url here"
			onChange={handleChange}
		/>
		<button className="button grow" onClick={handleSubmit}>
			{" "}
			Detect{" "}
		</button>
	</div>
);

export default Input;
