import './index.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import {
  faCloudMoonRain,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nav from './views/Nav';
import NewsFeed from './views/NewsFeed';
import ProfilePage from './views/ProfilePage';

class App extends React.Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            darkMode: localStorage.getItem("DARK_MODE")==='light'? false: true,
        }
    }
    toggleDarkMode = () => {
        localStorage.setItem("DARK_MODE", this.state.darkMode?'dark':'light');
        this.state.darkMode ? this.setState({darkMode: false}) : this.setState({darkMode: true})
    }
    currentTheme(){
        // https://www.pullrequest.com/blog/create-a-persisting-dark-mode-with-react/
        localStorage.setItem("DARK_MODE", this.state.darkMode?'dark':'light');
        return this.state.darkMode? 'dark' : 'light';
    }
    render(){
        return(
            // Q: How to change `data-theme` property of html tag? (Here, I've just jerryrigged it to `src0133root` component)
            <div className='src0133root' data-theme={this.currentTheme()}>
                <div className='header0133src fs30'>
                    <div className='growwgram0133header'>
                        Growwgram
                    </div>
                    <button className='theme0133header button' onClick={this.toggleDarkMode}>
                        {this.currentTheme() === 'light'? <FontAwesomeIcon icon={faSun} size='lg'/> : <FontAwesomeIcon icon={faCloudMoonRain} size='lg'/> }
                    </button>
                </div>
                {/* <div onClick={this.changeTheme} className='darkMode0133root'>floaty</div> */}
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
type Props = {};
type State = {
    darkMode: boolean;
};