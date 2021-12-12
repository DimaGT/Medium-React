import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalFeed from './pages/globalFeed'
import Article from './pages/article'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}

export default MainRoutes
