import React, { Component } from "react";
import { form, input, Fa } from "mdbreact";
import "./signIn.css";
import { Link } from "react-router-dom";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			errorMessage: ""
		};
	}

	componentDidMount() {
		localStorage.removeItem("token");
	}

	handleEmailChange = e => {
		const email = e.target.value;
		this.setState({ signInEmail: email });
	};

	handlePasswordChange = e => {
		const password = e.target.value;
		this.setState({ signInPassword: password });
	};

	handleSubmit = () => {
		if (
			this.state.signInEmail.length > 0 &&
			this.state.signInPassword.length > 0
		) {
			fetch("http://localhost:3000/signin", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				})
			})
				.then(res => res.json())
				.then(data => {
					if (data === "wrong credentials") {
						this.setState({
							errorMessage:
								"You have enterd wrong email or password"
						});
					} else if (data.user.email.length > 0) {
						this.props.grantAccess(data.token);
						this.props.historyPush(data.user);
					} else
						this.setState({
							errorMessage:
								"You have enterd wrong email or password"
						});
				});

			this.setState({ errorMessage: "" });
		} else this.setState({ errorMessage: "You have to fill the form!!" });
	};
	render() {
		return (
			<div className="d-flex justify-content-center align-items-center main-container">
				<div className="text-center p-2 form-container shadow-4">
					<h4 className="sign-in">Sign in</h4>
					<p style={{ color: "red" }}> {this.state.errorMessage} </p>
					<input
						type="email"
						id="defaultLoginFormEmail"
						className="form-control mb-4"
						placeholder="E-mail"
						onChange={this.handleEmailChange}
					/>

					<input
						type="password"
						id="defaultLoginFormPassword"
						className="form-control mb-4"
						placeholder="Password"
						onChange={this.handlePasswordChange}
					/>

					<div className="d-flex justify-content-around">
						<div>
							<div className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									id="defaultLoginFormRemember"
								/>
								<label
									className="custom-control-label"
									htmlFor="defaultLoginFormRemember"
								>
									Remember me
								</label>
							</div>
						</div>
						<div>
							<a href="">Forgot password?</a>
						</div>
					</div>

					<button
						className="btn btn-info btn-block my-4 signIn-btn"
						onClick={this.handleSubmit}
					>
						Sign in
					</button>

					<p>
						Not a member?
						<Link to="/Register" className="register-link">
							Register
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default SignIn;
