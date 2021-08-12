import React from "react";
import "./Rec.css";
import { Fa } from "mdbreact";

const Recognition = ({ imgUrl, name, input, detect }) => {
	if (!!imgUrl && !!input) {
		return (
			<div className="d-flex justify-content-center  flex-wrap recog-container">
				<div>
					<img src={imgUrl} alt="" className="img" />
				</div>

				{!name &&
					!!input &&
					detect && (
						<div className="d-flex flex-row justify-content-center align-items-center tc">
							<h4 className="ml-5"> Thinking </h4>
							<div>
								<Fa
									icon="spinner"
									spin
									size="2x"
									className="ml-3"
								/>
							</div>
						</div>
					)}
				<p className="name tc d-flex align-items-center ml-5">
					{" "}
					{name}{" "}
				</p>
			</div>
		);
	} else {
		return (
			<div className="img-box tc">
				<h3> Give me an image url to detect </h3>
			</div>
		);
	}
};

export default Recognition;
