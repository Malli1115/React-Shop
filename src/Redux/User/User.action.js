import UserTypes from "./User.types";
import { auth, handleUserProfile, GoogleProvider } from "../../Firebase/utils";

export const setCurrentUser = (user) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});

export const resetAllAuthForms = () => ({
  type: UserTypes.RESET_AUTH_FORMS,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatchFromSignIn) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatchFromSignIn({
        type: UserTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatchFromSignUp) => {
    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      dispatchFromSignUp({
        type: UserTypes.SIGN_UP_ERRORS,
        payload: err,
      });
      return;
    }

    try {
      const { users } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(users, { displayName });
      dispatchFromSignUp({
        type: UserTypes.SIGN_UP_SUCCESS,
        payload: true,
      });
    } catch (err) {
      //console.log(err);
    }
  };

export const forgotPasswordUser =
  ({ email }) =>
  async (dispatchFromForgotPassword) => {
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatchFromForgotPassword({
            type: UserTypes.FORGOT_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch((err) => {
          const error = ["Email doesn't found, Please enter registered email"];
          dispatchFromForgotPassword({
            type: UserTypes.FORGOT_PASSWORD_ERROR,
            payload: error,
          });
          // serErrors(err);
        });
    } catch (err) {
      //console.log(err);
    }
  };

export const signInWithGoogle = () => async (dispatchFromSignIn) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatchFromSignIn({
        type: UserTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (err) {
    //console.log(err)
  }
};
