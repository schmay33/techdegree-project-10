import React from "react";
import { Link } from 'react-router-dom';

function Header(props) {
  const isLoggedIn = props.user;
  if (isLoggedIn) {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/courses">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedin">
              <li>Welcome, name!</li>
              <li><a href="sign-out.html">Sign Out</a></li>
              </ul>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <Link to="/courses">Courses</Link>
          </h1>
          <nav>
            <ul className="header--signedout">
              <li>
                <Link to='/users/UserSignUp'>Sign Up</Link>
              </li>
              <li>
                <Link to='/users/UserSignIn'>Sign In</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;