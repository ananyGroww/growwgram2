import React from 'react';

import { Link } from 'react-router-dom';

export default class Nav extends React.Component{
    render(){
        return(
            <div className='footer0133src'>
                <Link to='/'>
                    News feed
                    {/* <button className='newsFeed0133footer button'>
                        News feed
                    </button> */}
                </Link>
                <Link to='/profile'>
                    My Profile
                    {/* <button className='profile0133footer button'>
                        My Profile
                    </button> */}
                </Link>
            </div>
        );
    }
}