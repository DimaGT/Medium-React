import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from "hooks/useFetch";
import { useEffect } from "react/cjs/react.development";
import useLocalStorage from "hooks/useLocalStorage";
import { CurrentUserContext } from "contexts/currentUser";
import BackendErrorMessages from "components/BackendErrorMessages";

function Authentication({ isLogin }) {
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const apiUrl = isLogin ? "/users/login" : "/users";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage("token");
  const [currentUserState, dispatch] =
  useContext(CurrentUserContext);
  console.log("useFetch", isLoading, error, response);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { username, email, password };

    doFetch({
      method: "post",
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token);
    
    setIsSuccessfullSubmit(true);

    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, setToken, dispatch]);

  if (isSuccessfullSubmit) {
    return <Navigate to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
