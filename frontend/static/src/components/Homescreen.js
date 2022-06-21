import { useState } from 'react'
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';
import Cookies from 'js-cookie';

function handleError(err) {
    console.warn(err);
}

const Homescreen = ({ setIsAuth }) => {
    const [screen, setScreen] = useState('newsfeed')
    const [articles, setArticles] = useState([]);



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

    return (
        <div className='h-full'>
            <nav className='py-2 h-16 flex sm:justify-between justify-end items-center bg-neutral-500 fixed top-0 w-full'>
                <h1 className='hidden sm:block font-bold text-2xl mx-3'>NEWS YAY</h1>
                <div className='h-full flex items-center'>
                <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('newsfeed')}>Newsfeed</button>
                <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('articleForm')}>Create an Article</button>
                <button type='button' className='mx-2 p-1 bg-red-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => userLogout()}>Logout</button>
                </div>
            </nav>

            <div className='bg-neutral-700 p-4 pt-20'>
            {screen === 'newsfeed' && <ArticleList articles={articles} setArticles={setArticles} />}
            {screen === 'articleForm' && <ArticleForm articles={articles} setArticles={setArticles} />}
            </div>

        </div>

    );
}

export default Homescreen