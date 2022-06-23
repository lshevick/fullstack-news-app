import { useEffect, useState } from 'react'
import ArticleList from './ArticleList';
import Cookies from 'js-cookie';
import DashboardView from './DashboardView';
import { Link } from 'react-router-dom';

function handleError(err) {
    console.warn(err);
}

const Homescreen = ({ setIsAuth, isAuth, navigate }) => {
    const [screen, setScreen] = useState('newsfeed')
    const [articles, setArticles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);


    const checkIfAdmin = async () => {
        const response = await fetch(`/api/v1/articles/admin/`).catch(handleError);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        setIsAdmin(true);
    }

    useEffect(() => {
        checkIfAdmin()
    }, [])


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
                <h1 className='hidden sm:block font-bold text-2xl mx-3 text-pink-800'>NEWS YAY</h1>
                <div className='h-full flex items-center'>
                    {/* <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('newsfeed')}>Newsfeed</button>
                    <button type='button' className='mx-2 p-1 bg-cyan-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => setScreen('articleForm')}>Dashboard</button>
                <button type='button' className='mx-2 p-1 bg-red-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => userLogout()}>Logout</button> */}
                    <Link className='mx-3 text-lg hover:underline' to='/'>Newsfeed</Link>
                    <Link className='mx-3 text-lg hover:underline' to='/dashboard'>Dashboard</Link>
                    {isAdmin && <Link className='mx-3 text-lg hover:underline' to='/review'>Review</Link>}
                    <button type='button' className='mx-2 p-1 bg-red-800 text-white rounded-md shadow-neutral-600 drop-shadow-md' onClick={() => { userLogout(); navigate('/') }}>Logout</button>
                </div>
            </nav>

            {/* <div className='bg-neutral-700 p-4 pt-20'> */}
            {/* <ArticleList articles={articles} setArticles={setArticles} isAuth={isAuth} /> */}
            {/* {screen === 'articleForm' && <DashboardView articles={articles} setArticles={setArticles} isAuth={isAuth} />} */}
            {/* </div> */}

        </div>

    );
}

export default Homescreen