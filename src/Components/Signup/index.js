import React, { Component } from "react";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import { auth, handleUserProfile } from "./../../Firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
  serverErr: "",
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      this.setState({
        errors: err,
      });
      return;
    }

    try {
      const { users } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(users);
      await handleUserProfile(users, { displayName });
      this.setState({
        ...initialState,
      });
    } catch (err) {
      this.setState({
        serverErr: "Please enter your details correctly",
      });
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors, serverErr } =
      this.state;

    return (
      <AuthWrapper headLine="Registration">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        {serverErr ? (
          <ul>
            <li>{serverErr}</li>
          </ul>
        ) : null}

        <div className="formwrap">
          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange={this.handleChange}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              handleChange={this.handleChange}
            />
            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signup;
