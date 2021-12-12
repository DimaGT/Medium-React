import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/login" element={<Authentication/>} />
            <Route path="/register" element={<Authentication/>} />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}

export default MainRoutes
