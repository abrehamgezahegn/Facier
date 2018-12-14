import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../contexts/MyAuthProvider";

const Navigation = () => (
	<div>
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
