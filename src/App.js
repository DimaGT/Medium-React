import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "routes";
import Header from "components/Header";
import { CurrentUserProvider } from "contexts/currentUser";
import CurrentUserChecker from "components/CurrentUserChecker";

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <Header />
          <MainRoutes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
