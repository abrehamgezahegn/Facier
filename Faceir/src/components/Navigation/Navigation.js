import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../contexts/MyAuthProvider";

const Navigation = () => (
	<div className="ml-4 mt-5 mb-20">
		<div className="nav d-flex justify-content-end">
			<AuthConsumer>
				{context => (
					<Link to="/SignIn" className="link">
						<span
							onClick={() => {
								context.takeAccess();
							}}
						>
							{" "}
							Sign out{" "}
						</span>
					</Link>
				)}
			</AuthConsumer>
		</div>
	</div>
);

export default Navigation;
