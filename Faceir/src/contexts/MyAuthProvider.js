import React, { Component } from "react";

export const {
	Provider: AuthProvider,
	Consumer: AuthConsumer
} = React.createContext();

class MyAuthProvider extends Component {
	state = {
		isAuthed: false
	};

	grantAccess = token => {
		this.setState({ isAuthed: true });
		localStorage.setItem("token", token);
	};

	takeAccess = () => {
		this.setState({ isAuthed: false });
		localStorage.removeItem("token");
	};

	render() {
		return (
			<AuthProvider
				value={{
					isAuthed: this.state.isAuthed,
					grantAccess: this.grantAccess,
					takeAccess: this.takeAccess
				}}
			>
				{this.props.children}
			</AuthProvider>
		);
	}
}
export default MyAuthProvider;
