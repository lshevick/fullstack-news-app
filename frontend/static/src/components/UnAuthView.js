// import { useState } from 'react'
// import ArticleList from './ArticleList';
// import LoginScreen from './LoginScreen';
import { Link } from 'react-router-dom';

const UnAuthView = ({isAuth, setIsAuth}) => {
    // const [screen, setScreen] = useState('newsfeed')
    // const [articles, setArticles] = useState([]);

    return (
        <div className='h-full'>
            <nav className='py-2 h-16 flex justify-between  items-center bg-neutral-500 fixed top-0 w-full'>
                <Link to='/'><h1 className='font-bold text-2xl mx-3 text-pink-800'>NEWS YAY</h1></Link>
                <div className='h-full flex items-center'>
                    {/* <button type='button' className='mx-2 p-1 hover:underline' onClick={() => setScreen('login')}>Login</button> */}
                    <Link to='/login' className='mx-3 hover:underline'>Login</Link>
                </div>
            </nav>

            {/* <div className='bg-neutral-700 p-4 pt-20'> */}
            {/* <ArticleList articles={articles} setArticles={setArticles} isAuth={isAuth} />
            {screen === 'login' && <LoginScreen setIsAuth={setIsAuth} /> } */}
            {/* </div> */}

        </div>
    );
}

export default UnAuthView;