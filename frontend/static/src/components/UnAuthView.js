// import { useState } from 'react'
// import ArticleList from './ArticleList';
// import LoginScreen from './LoginScreen';
import { Link } from "react-router-dom";

const UnAuthView = ({ isAuth, setIsAuth }) => {
  // const [screen, setScreen] = useState('newsfeed')
  // const [articles, setArticles] = useState([]);

  return (
    <div className="h-full">
      <nav className="py-2 h-16 flex justify-between  items-center bg-stone-500 fixed top-0 w-full">
        <Link to="/">
          <h1 className="font-bold text-4xl mx-3 text-pink-800">NEWS YAY</h1>
        </Link>
        <div className="h-full flex items-center">
          <Link to="/login" className="mx-3 hover:underline">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default UnAuthView;
