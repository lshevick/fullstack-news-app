import { useState } from 'react';
import './App.css';
import Cookies from 'js-cookie';
import Homescreen from './components/Homescreen';
import LoginScreen from './components/LoginScreen';

function handleError(err) {
  console.warn(err);
}


function App() {
  const [isAuth, setIsAuth] = useState(!!Cookies.get('Authorization'));

  const homescreen = (
    <div className="main-page">
      <ul>
        
      </ul>
    </div>
  )

  const loginScreen = (
    <div className="login-screen">
      this is the login page
    </div>
  )

  return (
    <div className="App">
      {isAuth ? <Homescreen /> : <LoginScreen setIsAuth={setIsAuth} />}
    </div>
  );
}

export default App;
