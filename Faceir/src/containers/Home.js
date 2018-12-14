import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Input from "../components/input/Input";
import Rank from "../components/Rank/Rank";
import Recognition from "../components/Recognition/Recognition";
import "./Home.css";
import Clarifai from "clarifai";
import { AuthConsumer } from "../contexts/MyAuthProvider";

import Particles from "react-particles-js";

// const particlesProps = {
// 	particles: {
// 		line_linked: {
// 			shadow: {
// 				enable: true,
// 				color: "#3CA9D1",
// 				blur: 5
// 			}
// 		},
// 		number: {
// 			value: 70,
// 			density: {
// 				enable: true,
// 				value_area: 800
// 			}
// 		}
// 	}
// };

const app = new Clarifai.App({
	apiKey: "0c1ed158dab644ef81e4315449a4cd2e"
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			nameImage: "",
			detect: false,
			user: {
				id: this.props.location.state.userData.id,
				name: this.props.location.state.userData.name,
				entries: this.props.location.state.userData.entries
			}
		};
	}

	loaded = () => {
		this.setState({ loaded: true });
	};
	handleChange = event => {
		this.setState({
			input: event.target.value,
			nameImage: ""
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		fetch("http://localhost:3000/image", {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.user.id
			})
		})
			.then(res => res.json())
			.then(count => {
				this.setState(
					Object.assign(this.state.user, {
						entries: count
					})
				);
			});
		// app.models
		// 	.predict("e466caa0619f444ab97497640cefc4dc", this.state.input)
		// 	.then(function(response) {
		// 		console.log(response);
		// 		const value =
		// 			response.outputs[0].data.regions[0].data.face.identity
		// 				.concepts[0].name;
		// 		return value;
		// 	})
		// 	.then(name => {
		// 		if (!!name) {

		// 		}
		// 		this.setState({ nameImage: name });
		// 	});

		// this.setState({ detect: !this.state.detect });
	};

	render() {
		console.log(this.state.user.name);
		return (
			<div>
				{/*<Particles className="particles" params={particlesProps} />*/}
				<Navigation />
				<Rank
					name={this.state.user.name}
					entries={this.state.user.entries}
				/>
				<Input
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				<Recognition
					imgUrl={this.state.input}
					name={this.state.nameImage}
					input={this.state.input}
					detect={this.state.detect}
				/>
			</div>
		);
	}
}

export default App;
