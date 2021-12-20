import BackendErrorMessages from "components/BackendErrorMessages";
import { CurrentUserContext } from "contexts/currentUser";
import useFetch from "hooks/useFetch";
import useLocalStorage from "hooks/useLocalStorage";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const Settings = () => {
  const apiUrl = "/user";
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useLocalStorage()
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }

    })
  };


  useEffect(() => {
    if(!currentUserState.currentUser){
      return
    }
    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    setBio(currentUserState.currentUser.bio)
    setEmail(currentUserState.currentUser.email)
  }, [currentUserState.currentUser])

  const logout = (e) => {
    e.preventDefault()
    setToken('')
    dispatch({type: 'LOGOUT'})
    setIsSuccessfullLogout(true)
  };

  useEffect (() => {
    if (!response) {
      return
    }

    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, dispatch])

  if(isSuccessfullLogout){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL of phrofile picture"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio"
                    onChange={e => setBio(e.target.value)}
                    value={bio}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
