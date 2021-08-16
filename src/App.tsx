import './index.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import Footer from './common/Footer';
import Nav from './common/Nav';
import NewsFeed from './views/NewsFeed/NewsFeed';
import ProfilePage from './views/Profile/ProfilePage';

class App extends React.Component<Props>{
    constructor(props:Props){
        super(props);
        if(localStorage.getItem("DARK_MODE") === 'dark')
            document.documentElement.setAttribute('data-theme', 'dark');
    }
    render(){
        return(
            <div className='src0133root'>
                <BrowserRouter>
                    <Nav/>
                    <Route path='/' exact component={NewsFeed}/>
                    <Route path='/myprofile' exact component={ProfilePage}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    };
}
export default App;
type Props = {};