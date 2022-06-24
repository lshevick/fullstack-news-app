import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ArticleList from './components/ArticleList';
import LoginScreen from './components/LoginScreen';
import DashboardView from './components/DashboardView';
import RegisterForm from './components/RegisterForm';
import Review from './components/Review';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='dashboard' element={<DashboardView/>}/>
          <Route path='login' element={<LoginScreen/>}/>
          <Route path='register' element={<RegisterForm/>}/>
          <Route path='review' element={<Review/>}/>
          <Route path='' element={<ArticleList/>}/>
        </Route>
        <Route path='*' element={
          <main style={{padding: '1rem'}}>
            <p>There's nothing here!</p>
          </main>
        }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
