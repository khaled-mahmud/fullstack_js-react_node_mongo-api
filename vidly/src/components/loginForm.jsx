import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // errors['username'] - Object
  // errors.find(e => e.name === 'username) - Array

  //username = React.createRef();

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    //Call the server
    //console.log("Submitted");

    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      //console.log(jwt);
      // localStorage.setItem("token", jwt);
      //this.props.history.push("/");
      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

    //console.log(this.props.location);
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
