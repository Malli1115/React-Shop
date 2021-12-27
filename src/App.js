import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./Firebase/utils";
import { setCurrentUser } from "./Redux/User/User.action";

import "./default.scss";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Recovery from "./Pages/Recovery";
import Dashboard from "./Pages/Dashboard";

//Hoc
import WithAuth from "./Hoc/WithAuth";

const App = (props) => {
  const dispatchFromApp = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatchFromApp(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      }
      dispatchFromApp(setCurrentUser(userAuth));
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Recovery />} />
          <Route
            path="/dashboard"
            element={
              <WithAuth>
                <Dashboard />
              </WithAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
