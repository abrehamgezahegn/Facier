import React, { Component } from "react";
import { AuthConsumer } from "../../contexts/MyAuthProvider";
import SignIn from "./SignIn";

class WrappedSignIn extends Component {
	historyPush = data => {
		this.props.history.push({ pathname: "/", state: { userData: data } });
	};

	render() {
		return (
			<AuthConsumer>
				{context => (
					<SignIn
						grantAccess={context.grantAccess}
						historyPush={this.historyPush}
					/>
				)}
			</AuthConsumer>
		);
	}
}

export default WrappedSignIn;
