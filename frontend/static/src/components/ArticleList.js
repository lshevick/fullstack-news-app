import { useState, useEffect } from 'react'

function handleError(err) {
    console.warn(err);
}

const ArticleList = ({ articles, setArticles }) => {


    const getArticles = async () => {
        const response = await fetch(`/api/v1/articles/`).catch(handleError)

        if (!response.ok) {
            throw new Error('Network response is not ok');
        }

        const json = await response.json();

        setArticles(json);
    }

    useEffect(() => {
        getArticles();
    }, [])



    const articleList = articles.map(article => (
        <li key={article.id}>
            <img src={article.image} alt="a newspaper" width='50%' />
            <h2>{article.title}</h2>
            <p>{article.username}</p>
            <p>{article.body}</p>
        </li>
    ))


    return (
        <ul>
            {articleList}
        </ul>
    );
}

export default ArticleList