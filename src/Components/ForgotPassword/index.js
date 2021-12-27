import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { auth } from "./../../Firebase/utils";
import {
  forgotPasswordUser,
  resetAllAuthForms,
} from "../../Redux/User/User.action";
import { useNavigate } from "react-router-dom";

const mapState = ({ user }) => ({
  forgotPasswordSuccess: user.forgotPasswordSuccess,
  forgotPasswordError: user.forgotPasswordError,
});

const ForgotPassword = (props) => {
  const { forgotPasswordSuccess, forgotPasswordError } = useSelector(mapState);
  const dispatchFromForgotPassword = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (forgotPasswordSuccess) {
      dispatchFromForgotPassword(resetAllAuthForms());
      navigate("/login");
    }
  }, [forgotPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(forgotPasswordError) && forgotPasswordError.length > 0) {
      setErrors(forgotPasswordError);
    }
  }, [forgotPasswordError]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatchFromForgotPassword(forgotPasswordUser({ email }));
  };

  return (
    <AuthWrapper headLine="Reset Password">
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleEmailSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Register Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
