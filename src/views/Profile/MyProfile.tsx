import React from 'react';

import { myProfileMetaData } from '../../constants/actionReducerConstants';
import ProfileStatsLoading from './ProfileStatsLoading';

export default class MyProfile extends React.Component<Props>{
    render(){
        // How to wire-up react content loader? https://youtu.be/SR8755C0bME
        const { growwgramId, bio, followers, following, pfpURL, total_photos } = this.props.myProfileMetaData;
        const isLoading = growwgramId.localeCompare('emptyrightnow0133'); //https://stackoverflow.com/a/2167619
        return(
                ( isLoading === 0 ) ? 
                <div className='userInfo0133profile'><ProfileStatsLoading/></div> :
                <div className='userInfo0133profile'>
                    <div className='pfp0133userInfo'>
                        <img className='image' src={pfpURL} alt='Profile'/>
                    </div>
                    <ul className='stats0133userInfo'>
                        <li key={growwgramId}><span className='growwgramId0133stats fs18'>{growwgramId}</span></li>
                        <li key='middlerow'>
                            <ul className='metric0133stats'>
                                <li key={followers}>{followers?followers:0} Followers</li>
                                <li key={following}>{following?following:0} Following</li>
                                <li key={total_photos}>{total_photos} Posts</li>
                            </ul>
                        </li>
                        <li key={bio}>{bio}</li>
                    </ul>
                </div>
        );
    };
};
type Props = {
    myProfileMetaData: myProfileMetaData;
};