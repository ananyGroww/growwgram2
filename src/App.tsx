import './index.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom';

import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
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
            // document.documentElement.setAttribute('data-theme', 'dark');
            // document.documentElement.removeAttribute('data-theme');
            <div className='src0133root' data-theme={this.currentTheme()}>
                <nav>
                    <ul className='header0133src fs30'>
                        <li className='growwgram0133header'>
                            Growwgram
                        </li>
                        {/* <li class></li> */}
                        <li className='theme0133header push0133header' onClick={this.toggleDarkMode}>
                            {/* <button className='button' onClick={this.toggleDarkMode}> */}
                                {this.currentTheme() === 'light'? <FontAwesomeIcon icon={faSun} size='lg'/> : <FontAwesomeIcon icon={faCloudMoonRain} size='lg'/> }
                            {/* </button> */}
                        </li>
                        <li className='myProfile0133header'>
                            {/* <button className='button'> */}
                                <FontAwesomeIcon icon={faIdBadge} size='lg'/>
                            {/* </button> */}
                        </li>
                    </ul>
                </nav>
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