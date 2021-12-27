import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import logo from "../../assests/logo.png";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);

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
              <>
                <Link to="/dashboard" className="registerLink">
                  My Account
                </Link>
                <span
                  className="registerLink"
                  onClick={() => auth.signOut()}
                  style={{ paddingLeft: "25px" }}
                >
                  LogOut
                </span>
              </>
            )}
            {!currentUser && (
              <>
                <Link
                  to="/registration"
                  className="registerLink"
                  style={{ paddingLeft: "25px" }}
                >
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
