import { useEffect, useState } from "react";
import ArticleDetail from "./ArticleDetail";
import Cookies from "js-cookie";

function handleError(err) {
  console.warn(err);
}

const ArticleList = ({ isAuth }) => {
  const [articles, setArticles] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [filter, setFilter] = useState("all");
  const [dataChanged, setDataChanged] = useState(false);

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

  useEffect(() => {
    getArticles();
  }, [dataChanged]);

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

  const tags = articles.map((article) => {
    return [...article.category].join("").toLocaleLowerCase();
  });

  const filterButtons = [...new Set(tags)].map((tag, i) => {
    return (
      <button
        key={i}
        type="button"
        value={tag}
        onClick={(e) => setFilter(e.target.value)}
        className="hover:bg-stone-400 hover:rounded-md transition-all border-b-2 border-b-stone-500 my-1 px-2"
      >
        {tag}
      </button>
    );
  });

  const articleList = articles
    .filter((article) =>
      filter === "all" ? article : article.category === filter
    )
    .map((article) => (
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
      <button
        type="button"
        className="absolute top-20 left-10 w-fit bg-stone-300 font-semibold p-1 px-2 rounded-md"
        onClick={() => setHidden(!hidden)}
      >
        Filter{" "}
        <span
          className={`font-semithin inline-block text-sm transition-all ${
            hidden ? `rotate-0` : `rotate-180`
          }`}
        >
          v
        </span>
      </button>
      <div
        className={`bg-stone-300 p-1 absolute left-12 top-32 px-5 rounded-md transition-all ${
          hidden ? `invisible opacity-0` : `visible opacity-1`
        }`}
      >
        <ul className="flex flex-col">
          <button
            type="button"
            value="all"
            onClick={(e) => setFilter(e.target.value)}
            className="hover:bg-stone-400 hover:rounded-md transition-all border-b-2 border-b-stone-500 my-1 px-2"
          >
            All
          </button>
          {filterButtons}
        </ul>
      </div>
      <ul className="sm:mx-auto sm:w-2/3 lg:w-full lg:m-0 lg:grid lg:grid-cols-3 lg:grid-flow-row">
        {articleList}
      </ul>
    </div>
  );
};

export default ArticleList;
