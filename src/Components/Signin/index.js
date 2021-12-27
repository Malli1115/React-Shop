import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../Redux/User/User.action";
import Button from "../Forms/Button";

import FormInput from "./../Forms/FormInput";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const Signin = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatchFromSignIn = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatchFromSignIn(resetAllAuthForms());
      navigate("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchFromSignIn(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatchFromSignIn(signInWithGoogle());
  };

  return (
    <AuthWrapper headLine="Login">
      <div className="formwrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/forgot">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signin;
