import { CurrentUserContext } from "contexts/currentUser";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

const FeedTogler = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <div className="feed-toogle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to={"/feed"} className={"nav-link"}>
              Your Feeds
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to={"/"} className={"nav-link"}>
            Global Feeds
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className={"nav-link"}>
              <i className="ion-pound">{tagName}</i>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedTogler;
