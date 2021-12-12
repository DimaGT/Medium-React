import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/login" element={<Authentication isLogin={true}/>} />
            <Route path="/register" element={<Authentication isLogin={false}/>} />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}

export default MainRoutes
