import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MainRoutes from "routes";
import Header from "components/Header";
import {CurrentUserProvider} from "contexts/currentUser";

function App() {
    return (
        <CurrentUserProvider>
            <Router>
                <Header/>
                <MainRoutes/>
            </Router>
        </CurrentUserProvider>
    );
}

export default App;
