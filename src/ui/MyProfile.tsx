import React from 'react';

export default class MyProfile extends React.Component<Props>{
    render(){
        const { growwgramId, bio, followers, following, pfpURL, total_photos } = this.props.myProfileMetaData;
        return(
            <div className='userInfo0133profile'>
                <div className='pfp0133userInfo'>
                    <img className='image' src={pfpURL} alt='Profile'/>
                </div>
                <ul className='stats0133userInfo'>
                    <li key={growwgramId} className='growwgramId0133stats fs18'>{growwgramId}</li>
                    <li>
                        <ul className='metric0133stats'>
                            <li key={followers}>Followers {followers?followers:0}</li>
                            <li key={following}>Following {following?following:0}</li>
                            <li key={total_photos}>Posts {total_photos}</li>
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
type myProfileMetaData = {
    growwgramId: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    total_photos: number;
    pfpURL: string;
};