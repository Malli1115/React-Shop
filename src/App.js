import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import Header from "./Components/Header";
import "./default.scss";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Recovery from "./Pages/Recovery";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }

      this.setState({
        ...initialState,
      });
    });
  }
  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              path="/registration"
              element={
                currentUser ? <Navigate replace to="/" /> : <Registration />
              }
            />
            <Route
              path="/login"
              element={currentUser ? <Navigate replace to="/" /> : <Login />}
            />
            <Route path="/forgot" element={<Recovery />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
