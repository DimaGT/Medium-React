import React from 'react'
import {Routes, Route} from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Authentication from 'pages/authentication'
import TagFeed from 'pages/tagFeed'
import YourFeed from 'pages/yourFeed'
import CreateArticle from 'pages/createArticle'
import EditArticle from 'pages/editArticle'
import Settings from 'pages/settings'
import UserProfile from 'pages/userProfile'


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalFeed/>} exact />
            <Route path="/profiles/:slug" element={<UserProfile/>} />
            <Route path="/profiles/:slug/favorites" element={<UserProfile/>} />
            <Route path="/articles/new" element={<CreateArticle/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/articles/:slug/edit" element={<EditArticle/>} />
            <Route path="/feed" element={<YourFeed/>} />
            <Route path="/tags/:slug" element={<TagFeed/>} />
            <Route path="/login" element={<Authentication isLogin={true}/>} />
            <Route path="/register" element={<Authentication isLogin={false}/>} />
            <Route path="/articles/:slug" element={<Article/>} />
        </Routes>
    )
}


export default MainRoutes
