import React, { Component } from "react";
import "./Reg.css";
import { Fa } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";
import owasp from "owasp-password-strength-test";

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4,
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passErrors: [],
      conPass: "",
      errorMessage: "",
      matchingErr: "",
      isDisabled: true,
      passwordMatch: false,
    };
  }

  componentDidMount() {
    localStorage.removeItem("token");
  }
  handleName = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  handleEmail = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };
  handlePassword = (e) => {
    const password = e.target.value;
    const { errors } = owasp.test(password);
    this.setState({ passErrors: errors });
    if (errors.length === 0) {
      this.setState({ password });
    }
  };
  handleConPassword = (e) => {
    const conPass = e.target.value;
    this.setState({ conPass });
  };
  handleSubmit = () => {
    let { name, email, password, conPass, passErrors } = this.state;
    if (passErrors.length === 0 && conPass !== password) {
      this.setState({ matchingErr: "Passwords do not match." });
    } else {
      this.setState({ matchingErr: "" });
      if (
        name.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        passErrors.length === 0
      ) {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BACKEND_URL}/register`,
          data: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          },
        })
          .then((res) => {
            console.log("res", res.data);
            if (res.data) {
              this.props.grantAccess(res.data.token);
              this.props.historyPush(res.data.user);
            }
          })
          .catch((err) => {
            console.log("err ", err);
            // if (err.error === "duplicateEmail") {
            this.setState({ errorMessage: "Email already exists" });
            // }
          });
      } else if (passErrors.length > 0) {
        this.setState({
          errorMessage: "password doesn't match the requirements!",
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
          <p style={{ color: "red" }}> {this.state.errorMessage} </p>
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
          <div className="d-flex mb-4 flex-column align-items-left text-left">
            {this.state.passErrors.map((err) => (
              <small className="form-text   auth" key={err}>
                {err}
              </small>
            ))}
          </div>
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
              Signin{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
