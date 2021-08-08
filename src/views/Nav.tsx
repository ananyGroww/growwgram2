import React from 'react';

import { Link } from 'react-router-dom';

import Button from '../common/Button';

export default class Nav extends React.Component{
    render(){
        return(
            <div>
                <Link to='/'><Button text='News feed'/></Link>
                <Link to='/profile'><Button text='My profile'/></Link>
                
            </div>
        );
    }
}