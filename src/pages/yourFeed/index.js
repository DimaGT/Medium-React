import {useEffect} from 'react'
import { Feed } from 'components/Feed';
import { useLocation  } from 'react-router-dom';
import { getPaginator, limit } from 'utils';
import { stringify } from 'query-string';
import useFetch from "hooks/useFetch";
import Pagination from 'components/Pagination';
import PopularTags from 'components/PopularTags';
import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';
import FeedTogler from 'components/FeedTogler';

const YourFeed = () => {
    //pagination pages count generator
    const {offset, currentPage} = getPaginator(useLocation().search)
    const currentUrl = useLocation().pathname
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles/feed?${stringifiedParams}`

    //api request
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])
    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium IT</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                    <FeedTogler/>
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles}/>
                                <Pagination total={response.articlesCount} limit={limit} url={currentUrl} currentPage={currentPage}/>
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourFeed