import React, { Component } from "react";
import { AuthConsumer } from "../../contexts/MyAuthProvider";
import Register from "./Register";

class WrappedRegister extends Component {
	historyPush = data => {
		this.props.history.push({ pathname: "/", state: { userData: data } });
	};

	render() {
		return (
			<AuthConsumer>
				{context => (
					<Register
						grantAccess={context.grantAccess}
						historyPush={this.historyPush}
					/>
				)}
			</AuthConsumer>
		);
	}
}

export default WrappedRegister;
