import { useEffect, useState } from "react";
import ArticleDetail from "./ArticleDetail";
import Cookies from "js-cookie";

function handleError(err) {
  console.warn(err);
}

const ArticleList = ({ isAuth }) => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const response = await fetch(`/api/v1/articles/`).catch(handleError);

    if (!response.ok) {
      throw new Error("Network response is not ok");
    }

    const json = await response.json();

    setArticles(json);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const deleteArticle = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(`/api/v1/articles/${id}/`, options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
    // const json = await response.json();
    // console.log(json)
    getArticles();
  };

  const articleList = articles.map((article) => (
    <ArticleDetail
      key={article.id}
      {...article}
      articles={articles}
      setArticles={setArticles}
      isAuth={isAuth}
      getArticles={getArticles}
      deleteArticle={deleteArticle}
    />
  ));

  return (
    <div className="py-28 px-4 bg-neutral-700">
      <ul className="sm:mx-auto sm:w-2/3 lg:w-full lg:m-0 lg:grid lg:grid-cols-3 lg:grid-flow-row">
        {articleList}
      </ul>
    </div>
  );
};

export default ArticleList;
