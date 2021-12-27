import UserTypes from "./User.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpError: [],
  signUpSuccess: false,
  forgotPasswordError: [],
  forgotPasswordSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case UserTypes.SIGN_UP_ERRORS:
      return {
        ...state,
        signUpError: action.payload,
      };
    case UserTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case UserTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: action.payload,
      };
    case UserTypes.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordError: action.payload,
      };
    case UserTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signUpError: [],
        signUpSuccess: false,
        forgotPasswordError: [],
        forgotPasswordSuccess: false,
      };
    default:
      return state;
  }
};

export default userReducer;
