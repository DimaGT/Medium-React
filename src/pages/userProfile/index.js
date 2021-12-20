import useFetch from "hooks/useFetch";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const UserProfile = () => {
  const slugSplit = useLocation().pathname.split("/");
  const isFavorites = useLocation().pathname.includes("favorites");
  const slug = isFavorites
    ? slugSplit[slugSplit.length - 2]
    : slugSplit[slugSplit.length - 1];

  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={response.profile.image} alt="" className="user-img" />
              <h4>
                {response.profile.username}
                <p>{response.profile.bio}</p>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggler">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    to={`/profiles/${response.profile.username}`}
                    className={`nav-link ${!isFavorites ? 'active' : ''}`}
                  >
                    My Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/profiles/${response.profile.username}/favorites`}
                    className={`nav-link ${isFavorites ? 'active' : ''}`}
                  >
                    Favorites Posts
                  </Link>
                </li>
              </ul>
            </div>
            {/* <UserArticles username={response.profile.username} location={location} isFavorites={isFavorites}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
