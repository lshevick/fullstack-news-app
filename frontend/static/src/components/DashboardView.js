import { useState, useEffect } from 'react';
import ArticleDetail from './ArticleDetail';
import ArticleForm from './ArticleForm';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const DashboardView = ({ articles, setArticles, isAuth }) => {
    const [userSubmittedArticles, setUserSubmittedArticles] = useState([]);
    const [userArticles, setUserArticles] = useState([]);

    useEffect(() => {
        const getUserArticles = async () => {

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Cookies.get('Authorization')}`,
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
            }
            const response = await fetch(`/api/v1/articles/author/drafts/`, options).catch(handleError);
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const json = await response.json();
            setUserArticles(json);
        }
        getUserArticles()
    }, [])

    useEffect(() => {
        const getUserSubmittedArticles = async () => {

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${Cookies.get('Authorization')}`,
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
            }
            const response = await fetch(`/api/v1/articles/author/submitted/`, options).catch(handleError);
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const json = await response.json();
            setUserSubmittedArticles(json);
        }
        getUserSubmittedArticles()
    }, [])

    return (
        <div className='py-20 px-5'>
            <div className='drafts w:5/6 md:w-2/3 lg:w-1/3 mx-auto p-4 px-8 bg-neutral-400 rounded-md'>
                <h2 className='text-2xl font-bold underline'>Drafts</h2>
                <div>
                    <ul>
                        {userArticles.map(item =>
                            <ArticleDetail key={item.id} {...item} userArticles={userArticles} setUserArticles={setUserArticles} isAuth={isAuth} />
                        )}
                    </ul>
                </div>
            </div>
            <div className="submitted mt-10 bg-neutral-400 rounded-md p-4 px-8 w:5/6 md:w-2/3 lg:w-1/3 mx-auto">
                <h2 className='text-2xl font-bold underline'>In Review</h2>
                <div>
                    <ul>
                        {userSubmittedArticles.map(item =>
                            <ArticleDetail key={item.id} {...item} userSubmittedArticles={userSubmittedArticles} setUserSubmittedArticles={setUserSubmittedArticles} isAuth={isAuth} />
                        )}
                    </ul>
                </div>
            </div>
            <ArticleForm articles={articles} userArticles={userArticles} setUserArticles={setUserArticles} />
        </div>
    );
}

export default DashboardView