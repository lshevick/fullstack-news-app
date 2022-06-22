import { useState } from 'react'
import ArticleList from './ArticleList';
import LoginScreen from './LoginScreen';

const UnAuthView = ({isAuth, setIsAuth}) => {
    const [screen, setScreen] = useState('newsfeed')
    const [articles, setArticles] = useState([]);

    return (
        <div className='h-full'>
            <nav className='py-2 h-16 flex sm:justify-between justify-end items-center bg-neutral-500 fixed top-0 w-full'>
                <h1 className='hidden sm:block font-bold text-2xl mx-3'>NEWS YAY</h1>
                <div className='h-full flex items-center'>
                    <button type='button' className='mx-2 p-1 bg-blue-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('login')}>Login</button>
                </div>
            </nav>

            <div className='bg-neutral-700 p-4 pt-20'>
            {screen === 'newsfeed' && <ArticleList articles={articles} setArticles={setArticles} isAuth={isAuth} />}
            {screen === 'login' && <LoginScreen setIsAuth={setIsAuth} /> }
            </div>

        </div>
    );
}

export default UnAuthView;