import React from "react";
import { Link, useNavigate,  } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../images/evangadi-logo.png";

function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  console.log("Header isLoggedIn:", isLoggedIn);
  const handleLogoutLogin = (e) => {
    if (e.target.name === "signin") {
      navigate("/");

    } else {
      handleLogout();
      navigate("/");
    }
  };
  return (
    <header className={classes.header_container}>
      <div className={classes.header_content}>
        <Link to="/" className={classes.logo_link}>
          <img src={logo} alt=" Logo" />
        </Link>
        <nav className={classes.nav_links}>
          <Link to="/home" className={classes.nav_link}>
            Home
          </Link>
          <Link to="/about" className={classes.nav_link}>
            How it works
          </Link>
          {isLoggedIn ? (
           
            <button
              onClick={handleLogoutLogin}
              name="signout"
              className={`${classes.auth_button} ${classes.logout}`}
            >
              LOG OUT
            </button>
          ) : (
         
            <button
              name="signin"
              type="submit"
              onClick={handleLogoutLogin}
              className={`${classes.auth_button} ${classes.login}`}
            >
              SIGN IN
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
