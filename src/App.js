import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import MainRoutes from "routes";
import Header from "components/Header";

function App() {
  return (
    <div>
      <Router>
      <Header/>
        <MainRoutes />
      </Router>
    </div>
  );
}

export default App;
