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

const GlobalFeed = () => {
    //pagination pages count generator
    const {offset, currentPage} = getPaginator(useLocation().search)
    const currentUrl = useLocation().pathname
    const slugSplit = useLocation().pathname.split("/");
    const slug = slugSplit[slugSplit.length - 1];
    const stringifiedParams = stringify({
        limit,
        offset,
    })
    const apiUrl = `/articles?${stringifiedParams}`

    //api request
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage, slug])
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
                        <FeedTogler tagName={slug}/>
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

export default GlobalFeed