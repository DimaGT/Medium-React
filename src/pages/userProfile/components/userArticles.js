import ErrorMessage from "components/ErrorMessage";
import { Feed } from "components/Feed";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import useFetch from "hooks/useFetch";
import { stringify } from "query-string";
import React from "react";
import { useEffect } from "react/cjs/react.development";
import { getPaginator, limit } from "utils";

const UserArticles = ({ username, location, isFavorites, url }) => {
  console.log(location);
  const getApiUrl = ({ username, offset, isFavorites }) => {
    const params = isFavorites
      ? { limit, offset, favorited: username }
      : { limit, offset, author: username };
      return `/articles?${stringify(params)}`
  };

  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])
  return (
    <div>
      {isLoading && <Loading/>}
      {error && <ErrorMessage/>}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles}/>
          <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage}/>
        </>
      )}
    </div>
  );
};

export default UserArticles;
