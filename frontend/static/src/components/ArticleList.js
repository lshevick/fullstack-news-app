import { useEffect } from 'react'
import ArticleDetail from './ArticleDetail';

function handleError(err) {
    console.warn(err);
}

const ArticleList = ({ articles, setArticles, isAuth }) => {


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
        <ArticleDetail key={article.id} {...article} articles={articles} setArticles={setArticles} isAuth={isAuth} />
    ))


    return (
        <div className='mt-2'>
            <ul className='sm:mx-auto sm:w-2/3 lg:w-1/2'>
                {articleList}
            </ul>
        </div>
    );
}

export default ArticleList