import React, { useContext } from "react";
import { CurrentUserContext } from "contexts/currentUser";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Home
            </NavLink>
          </li>
          {!currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to={"/login"} className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/register"} className="nav-link">
                  Sing Up
                </NavLink>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/articles/new" className={"nav-link"}>
                  <i className="ion-compose"></i>
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className={"nav-link"}
                >
                  <img
                    src={currentUserState.currentUser.image}
                    alt=""
                    className="user-pic"
                  />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
