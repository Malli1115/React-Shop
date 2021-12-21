import React from "react";
import "./styles.scss";
import logo from "../../assests/logo.png";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/utils";

const Header = (props) => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="warp">
        <div className="headermenu">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div>
            {currentUser && (
              <span className="registerLink" onClick={() => auth.signOut()}>
                LogOut
              </span>
            )}
            {!currentUser && (
              <>
                <Link to="/registration" className="registerLink">
                  Register
                </Link>
                <Link
                  to="/login"
                  className="registerLink"
                  style={{ paddingLeft: "25px" }}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
