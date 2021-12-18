import ArticleForm from "components/ArticleForm";
import { CurrentUserContext } from "contexts/currentUser";
import useFetch from "hooks/useFetch";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext)

  const apiUrl = "/articles";

  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };
  const handleSubmit = (article) => {
    console.log(article, "kek");
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Navigate to={'/'} />;
  }
  if (isSuccessfullSubmit) {
    return <Navigate to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
