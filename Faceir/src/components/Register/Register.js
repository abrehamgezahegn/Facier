import React, { Component } from "react";
import "./Reg.css";
import { Fa } from "mdbreact";
import { Link } from "react-router-dom";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			conPass: "",
			errorMessage: "",
			matchingErr: "",
			isDisabled: true,
			passwordMatch: false
		};
	}

	handleName = e => {
		const name = e.target.value;
		this.setState({ name });
	};
	handleEmail = e => {
		const email = e.target.value;
		this.setState({ email });
	};
	handlePassword = e => {
		const password = e.target.value;
		console.log(password);
		this.setState({ password });
	};
	handleConPassword = e => {
		const conPass = e.target.value;
		this.setState({ conPass });
	};
	handleSubmit = () => {
		let { name, email, password, conPass } = this.state;
		if (conPass !== password) {
			this.setState({ matchingErr: "Bruh passwords do not match!!" });
		} else {
			this.setState({ matchingErr: "" });
			if (name.length > 0 && email.length > 0 && password.length > 0) {
				fetch("http://localhost:3000/register", {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: this.state.name,
						email: this.state.email,
						password: this.state.password
					})
				})
					.then(res => res.json())
					.then(data => {
						if (data) {
							this.props.grantAccess();
							this.props.historyPush(data);
						}
					});
			} else {
				this.setState({ errorMessage: "Please fill out all forms." });
			}
		}
	};
	render() {
		return (
			<div className="d-flex justify-content-center align-items-center main-container">
				<div className="text-center  p-2 form-container shadow-4">
					<h4 className="sign-in">Sign up</h4>
					<p> {this.state.errorMessage} </p>
					<div className="form-row mb-4">
						<div className="col">
							<input
								type="text"
								id="defaultRegisterFormFirstName"
								className="form-control"
								placeholder="Name"
								onChange={this.handleName}
							/>
						</div>
					</div>
					<input
						type="email"
						id="defaultRegisterFormEmail"
						className="form-control mb-4"
						placeholder="E-mail"
						onChange={this.handleEmail}
					/>
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						aria-describedby="defaultRegisterFormPasswordHelpBlock"
						onChange={this.handlePassword}
					/>
					<small
						id="defaultRegisterFormPasswordHelpBlock"
						className="form-text  mb-4 auth"
					>
						At least 8 characters and 1 digit
					</small>
					<input
						type="password"
						className="form-control"
						placeholder="confirm password"
						aria-describedby="defaultRegisterFormPasswordHelpBlock"
						onChange={this.handleConPassword}
						// disabled={this.state.isDisabled}
					/>
					<p> {this.state.matchingErr} </p>

					<button
						className="btn btn-info my-4 btn-block signIn-btn grow"
						type="submit"
						onClick={this.handleSubmit}
					>
						Sign in
					</button>
					<div className="d-flex flex-row justify-content-center">
						<p className="mt-1"> Already have an account?</p>
						<Link to="/SignIn" className="login-link">
							{" "}
							Login{" "}
						</Link>
					</div>
					<hr />
					<p>
						By clicking
						<em>Sign up</em> you agree to our
						<a href="" target="_blank">
							terms of service
						</a>{" "}
						and
						<a href="" target="_blank">
							terms of service
						</a>
						.{" "}
					</p>
				</div>
			</div>
		);
	}
}

export default Register;
