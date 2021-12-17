import useFetch from 'hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import ErrorMessage from './ErrorMessage'
import Loading from './Loading'

const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags')
    const tags = response.tags.length !== 0 ? response.tags : ['test', 'mock', 'training', 'cofee', 'shop', 'animals', 'earth', 'flowers', 'books'] 

    useEffect(() => {
        doFetch()
    }, [doFetch])

    if(isLoading || !response) {
        return <Loading/>
    }
    if(error) {
        return <ErrorMessage/>
    }
    return (
        <div className="sidebar">
            <p>Popular tags</p>
            <div className="tag-list">
                {tags.map(tag => (
                    <Link to={`/tags/${tag}`} className='tag-default tag-pill' key={tag}>
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularTags
