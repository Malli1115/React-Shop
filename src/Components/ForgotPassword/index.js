import React, { Component } from "react";
import AuthWrapper from "../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { auth } from "./../../Firebase/utils";

const initialState = {
  email: "",
  serverErr: "",
};

class ForgotPassword extends Component {
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

  handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.replace("/login");
        })
        .catch(() => {
          this.setState({
            serverErr: "Email not found !",
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, serverErr } = this.state;

    return (
      <AuthWrapper headLine="Reset Password">
        {serverErr ? (
          <ul>
            <li style={{ paddingBottom: "7px" }}>{serverErr}</li>
          </ul>
        ) : null}
        <div className="formWrap">
          <form onSubmit={this.handleEmailSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Register Email"
              onChange={this.handleChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default ForgotPassword;
