import './Footer.css';

import React from 'react';

import { Link } from 'react-router-dom';

export default class Footer extends React.Component{
    render(){
        return(
            <div className='footer0133src'>
                <Link to='/'>News feed</Link>
                <Link to='/myprofile'>My Profile</Link>
            </div>
        );
    }
}