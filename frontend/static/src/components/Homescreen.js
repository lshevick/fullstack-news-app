import { useEffect, useState } from 'react'
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';
import Cookies from 'js-cookie';
import ArticleDetail from './ArticleDetail';

function handleError(err) {
    console.warn(err);
}

const Homescreen = ({ setIsAuth, isAuth }) => {
    const [screen, setScreen] = useState('newsfeed')
    const [articles, setArticles] = useState([]);
    const [userArticles, setUserArticles] = useState([]);




    const userLogout = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        }

        const response = await fetch('/dj-rest-auth/logout/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();

        Cookies.remove('Authorization', `Token ${json.key}`)
        setIsAuth(false)
    }

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
            const response = await fetch(`/api/v1/articles/author/drafts`, options).catch(handleError);
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const json = await response.json();
            setUserArticles(json);
        }
        getUserArticles()
    }, [])

    const dashboardView = (
        <div className=''>
            <div className='drafts w-2/3 mx-auto p-4 px-8 bg-neutral-400 rounded-md'>
                <h2>Drafts</h2>
                <div>
                    <ul>
                        {userArticles.map(item => 
                            <ArticleDetail key={item.id} {...item} articles={articles} setArticles={setArticles} isAuth={isAuth}/>
                            )}
                    </ul>
                </div>
            </div>
            <ArticleForm articles={articles} userArticles={userArticles} setUserArticles={setUserArticles} />
        </div>
    )

    return (
        <div className='h-full'>
            <nav className='py-2 h-16 flex sm:justify-between justify-end items-center bg-neutral-500 fixed top-0 w-full'>
                <h1 className='hidden sm:block font-bold text-2xl mx-3'>NEWS YAY</h1>
                <div className='h-full flex items-center'>
                    <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('newsfeed')}>Newsfeed</button>
                    <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('articleForm')}>Dashboard</button>
                    <button type='button' className='mx-2 p-1 bg-red-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => userLogout()}>Logout</button>
                </div>
            </nav>

            <div className='bg-neutral-700 p-4 pt-20'>
                {screen === 'newsfeed' && <ArticleList articles={articles} setArticles={setArticles} isAuth={isAuth} />}
                {screen === 'articleForm' && dashboardView}
            </div>

        </div>

    );
}

export default Homescreen