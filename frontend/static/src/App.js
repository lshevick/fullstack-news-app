import { useState } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import Homescreen from './components/Homescreen';
import LoginScreen from './components/LoginScreen';
import UnAuthView from './components/UnAuthView';

// function handleError(err) {
//   console.warn(err);
// }

// need to create a normal non-auth view for anyone who visits this news site for the first time.
// need to have a navbar with a login button in the corner where someone can go to login or register to become a contributor
// reader can also filter the articles by category
// once they login they have more options in the navbar where they can access the create article form and also view the normal news feed
// you need to filter the database with permissions and views
// make sure to lock down the backend

function App() {
  const [isAuth, setIsAuth] = useState(!!Cookies.get('Authorization'));

  return (
    <div className="App bg-neutral-700 h-full">
      {isAuth ? <Homescreen setIsAuth={setIsAuth} isAuth={isAuth} /> : <UnAuthView  isAuth={isAuth} setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
