import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'
import TagFeed from 'pages/tagFeed'
import YourFeed from 'pages/yourFeed'
import CreateArticle from 'pages/createArticle'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/articles/new" element={<CreateArticle/>} />
            <Route path="/feed" element={<YourFeed/>} />
            <Route path="/tags/:slug" element={<TagFeed/>} />
            <Route path="/login" element={<Authentication isLogin={true}/>} />
            <Route path="/register" element={<Authentication isLogin={false}/>} />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}


export default MainRoutes
