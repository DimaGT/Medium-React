import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'
import TagFeed from 'pages/tagFeed'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/tags/:slug" element={<TagFeed/>} />
            <Route path="/login" element={<Authentication isLogin={true}/>} />
            <Route path="/register" element={<Authentication isLogin={false}/>} />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}

export default MainRoutes
