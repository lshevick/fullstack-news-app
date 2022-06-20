import {useState} from 'react'
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';

const Homescreen = () => {
    const [articles, setArticles] = useState([]);

    return(
        <div>
            <nav>

            </nav>

            <div className='news-feed-view'>

            <h1>News Feed</h1>
            <ul>
            <ArticleList articles={articles} setArticles={setArticles} />
            </ul>
            </div>

            <div className="article-form-view">
                <ArticleForm articles={articles} setArticles={setArticles} /> 
            </div>
        </div>

    );
}

export default Homescreen