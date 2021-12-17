import React from 'react'
import { NavLink } from 'react-router-dom'

const FeedTogler = ({tagName}) => {
    return (
        <div className="feed-toogle">
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <NavLink to={'/feed'} className={'nav-link'}>
                        Your Feeds
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/'} className={'nav-link'} exact>
                        Global Feeds
                    </NavLink>
                </li>
                {tagName && (
                    <li className="nav-item">
                    <NavLink to={`/tags/${tagName}`} className={'nav-link'} exact>
                        <i className="ion-pound">
                            {tagName}
                        </i>
                    </NavLink>
                </li>
                )}
            </ul>
        </div>
    )
}

export default FeedTogler
