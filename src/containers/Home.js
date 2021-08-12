import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Input from "../components/input/Input";
import Rank from "../components/Rank/Rank";
import Recognition from "../components/Recognition/Recognition";
import "./Home.css";
import Clarifai from "clarifai";
import { AuthConsumer } from "../contexts/MyAuthProvider";
import axios from "axios";

import Particles from "react-particles-js";

const particlesProps = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
    },
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: "765407f142ad45a888f78f8a622c9c37",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      nameImage: "",
      detect: false,
      user: {
        id: undefined,
        name: undefined,
        entries: undefined,
      },
    };
  }

  componentDidMount() {
    fetch(
      `${process.env.BACKEND_URL}/profile/${this.props.location.state.userData.id}`
    )
      .then((res) => res.json())
      .then((user) => {
        const entries = user.entries;
        return entries;
      })
      .then((entries) => {
        this.setState({
          user: {
            id: this.props.location.state.userData.id,
            name: this.props.location.state.userData.name,
            entries,
          },
        });
      });
  }

  loaded = () => {
    this.setState({ loaded: true });
  };
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
      nameImage: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      url: `${process.env.REACT_APP_BACKEND_URL}/image`,
      data: {
        id: this.state.user.id,
        token,
      },
    }).then((res) => {
      if (res.data !== "invalid token") {
        localStorage.setItem("token", res.data.token);

        app.models
          .predict("e466caa0619f444ab97497640cefc4dc", this.state.input)
          .then((response) => {
            console.log(response);
            const value =
              response.outputs[0].data.regions[0].data.face.identity.concepts[0]
                .name;
            return value;
          })
          .then((name) => {
            if (!!name) {
              console.log(name);
              this.setState({
                nameImage: name,
                detect: !this.state.detect,
              });

              this.setState(
                Object.assign(this.state.user, {
                  entries: res.data.entries,
                })
              );
            }
          });
      } else if (res.data === "invalid token") {
        localStorage.removeItem("token");
        this.props.history.push("/signin");
      }
    });
  };
  render() {
    return (
      <div>
        <Particles className="particles" params={particlesProps} />
        <Navigation />
        <Rank
          name={this.props.location.state.userData.name}
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
