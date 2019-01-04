import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import WrappedRegister from "../components/Register/WrappedRegister";
import WrappedSignIn from "../components/SignIn/WrappedSignIn";
import Home from "../containers/Home";
import MyAuthProvider from "../contexts/MyAuthProvider";
import jwt from "jsonwebtoken";

const checkAuth = () => {
	const token = localStorage.getItem("token");

	if (!token) {
		return false;
	}

	try {
		const { exp } = jwt.decode(token);

		if (exp < new Date().getTime() / 1000) {
			return false;
		}
	} catch (err) {
		return false;
	}

	return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			checkAuth() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/signin" }} />
			)
		}
	/>
);

const AppRouter = () => (
	<MyAuthProvider>
		<BrowserRouter>
			<div>
				<Switch>
					<AuthRoute path="/" component={Home} exact={true} />
					<Route exaxt path="/register" component={WrappedRegister} />
					<Route exact path="/signin" component={WrappedSignIn} />
				</Switch>
			</div>
		</BrowserRouter>
	</MyAuthProvider>
);

export default AppRouter;
