import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import WrappedRegister from "../components/Register/WrappedRegister";
import WrappedSignIn from "../components/SignIn/WrappedSignIn";
import Home from "../containers/Home";
import Logo from "../components/Logo/Logo";
import MyAuthProvider from "../contexts/MyAuthProvider";

const checkAuth = () => {
	const token = localStorage.getItem("token");
	// const refreshToken = localStorage.getItem("token");
	if (!token) {
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
				<Logo />
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
