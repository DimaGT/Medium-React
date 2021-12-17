import {useEffect} from 'react'
import useFetch from "hooks/useFetch";
import { Feed } from 'components/Feed';
import Pagination from 'components/Pagination';
import { useLocation  } from 'react-router-dom';
import { getPaginator, limit } from 'utils';
import { stringify } from 'query-string';
import PopularTags from 'components/PopularTags';
import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';

const GlobalFeed = () => {
    //pagination pages count generator
    const {offset, currentPage} = getPaginator(useLocation().search)
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles?${stringifiedParams}`

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
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles}/>
                                <Pagination total={response.articlesCount} limit={limit} url={'/'} currentPage={currentPage}/>
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