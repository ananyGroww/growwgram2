import './index.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import Footer from './views/Footer/Footer';
import Nav from './views/Nav/Nav';
import NewsFeed from './views/NewsFeed/NewsFeed';
import ProfilePage from './views/Profile/ProfilePage';

class App extends React.Component<Props, State> {
    render(){
        return(
            <div className='src0133root'>
                <BrowserRouter>
                    <Nav/>
                    <Route path='/' exact component={NewsFeed}/>
                    <Route path='/profile' exact component={ProfilePage}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    };
}
export default App;
type Props = {};
type State = {
    darkMode: boolean;
};