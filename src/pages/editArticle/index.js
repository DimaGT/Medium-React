import ArticleForm from "components/ArticleForm";
import { CurrentUserContext } from "contexts/currentUser";
import useFetch from "hooks/useFetch";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const EditArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext)
  const slugSplit = useLocation().pathname.split("/");
  const slug = slugSplit[slugSplit.length - 2];

  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);

  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
  const handleSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: {
        article,
      },
    });
  };

  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if(!updateArticleResponse){
      return
    }
    setIsSuccessfulSubmit(true)
  }, [updateArticleResponse])

  if(currentUserState.isLoggedIn === false) {
    return <Navigate to={'/'}/>

  }

  if(isSuccessfulSubmit) {
    return <Navigate to={`/articles/${slug}`}/>
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
