import React, { Component } from "react";
import Button from "../Forms/Button";
import { auth, signInWithGoogle } from "../../Firebase/utils";
import FormInput from "./../Forms/FormInput";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  serverErr: "",
};

class Signin extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      this.setState({
        serverErr: "Please enter a vaild email & password",
      });
      setInterval(
        () =>
          this.setState({
            serverErr: "",
          }),
        2000
      );
    }
  };

  render() {
    const { email, password, serverErr } = this.state;
    return (
      <AuthWrapper headLine="Login">
        {serverErr ? (
          <ul>
            <li style={{ paddingBottom: "7px" }}>{serverErr}</li>
          </ul>
        ) : null}

        <div className="formwrap">
          <form onSubmit={this.handleSubmit}>
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
            <Button type="submit">Login</Button>

            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
            <div className="links">
              <Link to="/forgot">Reset Password</Link>
            </div>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signin;
