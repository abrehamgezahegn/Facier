import React from "react";
import Tilt from "react-tilt";
import "./logo.css";

const Logo = () => (
	<div className="logo-container">
		<div className="logo ">
			<Tilt
				className="Tilt br2 shadow-5 "
				options={{ max: 25 }}
				style={{ height: 100, width: 100 }}
			>
				<div className="Tilt-inner">
					{" "}
					<img src="https://png.icons8.com/metro/50/000000/brain.png" />{" "}
				</div>
			</Tilt>
		</div>
	</div>
);

export default Logo;
