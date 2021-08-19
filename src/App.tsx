import './index.css';

import React, { useEffect } from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './common/Footer';
import Nav from './common/Nav';
import ElsesProfilePage from './views/ElsesProfile/ElsesProfilePage';
import NewsFeed from './views/NewsFeed/NewsFeed';
import ProfilePage from './views/Profile/ProfilePage';

const App = () => {
    useEffect( ()=>{
        if(localStorage.getItem("DARK_MODE") === 'dark')
            document.documentElement.setAttribute('data-theme', 'dark');
    }
    ,[]);
    return(
        <div className='src0133root'>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Nav/>
                <Route path='/' exact component={NewsFeed}/>
                <Route path='/myprofile' exact component={ProfilePage}/>
                <Route path='/visituser' exact component={ElsesProfilePage}/>
                <Footer/>
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={10000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default App;