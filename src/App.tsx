import './index.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import Nav from './views/Nav';
import NewsFeed from './views/NewsFeed';
import ProfilePage from './views/ProfilePage';

class App extends React.Component {
    render(){
        return(
            <div>
                Basic Scaffolding: App
                <BrowserRouter>
                    <Route path='/' exact component={NewsFeed}/>
                    <Route path='/profile' exact component={ProfilePage}/>
                    <Nav/>
                </BrowserRouter>
                
            </div>
        )
    };
}
export default App;