import '../styles/Nav/Nav.css';

import React from 'react';

import { Link } from 'react-router-dom';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faCloudMoonRain,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Nav extends React.Component<Props, State>{
    render(){
        return(
            <nav className='nav0133src'>
                <ul className='header0133nav fs30'>
                    <li className='growwgram0133header'>
                        <Link to='/'>Growwgram</Link>
                    </li>
                    <li className='theme0133header push0133header' onClick={this.toggleDarkMode}>
                            { 
                                this.currentTheme() === 'light'? 
                                <FontAwesomeIcon icon={faSun} size='lg'/> : 
                                <FontAwesomeIcon icon={faCloudMoonRain} size='lg'/> 
                            }
                    </li>
                    <li className='myProfile0133header'>
                            <Link to='/myprofile'>
                                <FontAwesomeIcon icon={faUser} size='lg'/>
                            </Link>
                    </li>
                </ul>
            </nav>
        );
    };
    toggleDarkMode = () => {
        localStorage.getItem("DARK_MODE")==='light'?
            this.setDarkMode():
            this.setLightMode();
    };
    setLightMode = () => {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem("DARK_MODE",'light');
        this.setState({darkMode: 'light'});
    };
    setDarkMode = () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem("DARK_MODE",'dark');
        this.setState({darkMode: 'dark'});
    };
    currentTheme(){
        return localStorage.getItem("DARK_MODE");
        // return this.state.darkMode;
    };
    constructor(props:Props){
        super(props);
        this.state = {
            darkMode: '',
        }
        if(localStorage.getItem("DARK_MODE") === null){
            localStorage.setItem("DARK_MODE",'light');
            this.setState({darkMode: 'light'});
        }
    };

};
type Props = {};
type State = {
    darkMode: string;
};