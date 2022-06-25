import { useState, useEffect } from "react";
import ArticleDetail from "./ArticleDetail";
import ArticleForm from "./ArticleForm";
import Cookies from "js-cookie";

function handleError(err) {
  console.warn(err);
}

const DashboardView = ({ articles, setArticles, isAuth }) => {
  const [userSubmittedArticles, setUserSubmittedArticles] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const getUserArticles = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cookies.get("Authorization")}`,
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(
      `/api/v1/articles/author/drafts/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
    const json = await response.json();
    setUserArticles(json);
  };

  const getUserSubmittedArticles = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${Cookies.get("Authorization")}`,
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(
      `/api/v1/articles/author/submitted/`,
      options
    ).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response not ok");
    }
    const json = await response.json();
    setUserSubmittedArticles(json);
  };
  useEffect(() => {
    getUserArticles();
    getUserSubmittedArticles();
  }, []);

  useEffect(() => {
    getUserArticles();
    getUserSubmittedArticles();
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
    getUserArticles();
  };

  return (
    <div className="py-20 px-5 lg:flex lg:items-start lg:justify-start h-full">
      <ArticleForm
        articles={articles}
        userArticles={userArticles}
        setUserArticles={setUserArticles}
        setDataChanged={setDataChanged}
      />
      <div className="drafts w:5/6 sm:w-2/3 lg:w-1/3 mx-auto p-4 px-8 bg-neutral-300 rounded-md">
        <div className="border-b-2 border-black">
          <h2 className="text-2xl font-bold font-serif">Drafts</h2>
        </div>
        <div>
          <ul>
            {userArticles.map((item) => (
              <ArticleDetail
                key={item.id}
                {...item}
                userArticles={userArticles}
                setUserArticles={setUserArticles}
                isAuth={isAuth}
                setDataChanged={setDataChanged}
                deleteArticle={deleteArticle}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="submitted mt-10 lg:mt-0 bg-neutral-300 rounded-md p-4 px-8 w:5/6 md:w-2/3 lg:w-1/3 mx-auto">
        <div className="border-b-2 border-black">
          <h2 className="text-2xl font-bold font-serif">In Review</h2>
        </div>
        <div>
          <ul>
            {userSubmittedArticles.map((item) => (
              <ArticleDetail
                key={item.id}
                {...item}
                userSubmittedArticles={userSubmittedArticles}
                setUserSubmittedArticles={setUserSubmittedArticles}
                isAuth={isAuth}
                setDataChanged={setDataChanged}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
