import React from 'react';

import { connect } from 'react-redux';

import { userImagesActionCreator } from '../actions';

class ProfilePage extends React.Component<Props>{
    componentDidMount(){
        const { visitingUser, userImagesActionCreator, } = this.props;
        userImagesActionCreator(visitingUser.username);
    }
    renderPortfolioImages(){
        const { visitingUserImagesURLList } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < visitingUserImagesURLList.length; i++) {
            cards.push(<img className='image' key={visitingUserImagesURLList[i]} src={visitingUserImagesURLList[i]} alt={visitingUserImagesURLList[i]}/>);
        }
        return cards;
    }
    render(){
        const { visitingUser, visitingUserImagesURLList } = this.props;
        const { growwgramId, bio, followers, following, profilePicture, posts} = visitingUser;
        console.log(`visitingUserImagesURLList:render/ProfilePage`, visitingUserImagesURLList);
        return(
            <div className='profile0133src'>
                <div className='userInfo0133profile'>
                    <div className='pfp0133userInfo'>
                        <img className='image' src={profilePicture} alt='Profile'/>
                    </div>
                    <ul className='stats0133userInfo'>
                        <li className='growwgramId0133stats fs12'>{growwgramId}</li>
                        <li>Followers {followers?followers:0}</li>
                        <li>Following {following?following:0}</li>
                        <li>Posts {posts}</li>
                        <li>{bio}</li>
                    </ul>
                </div>
                <div className='portfolio0133profile'>
                    {this.renderPortfolioImages()}
                </div>
            </div>
        )
    };
}
const mapStateToProps = (state:ReduxState) => {
    // console.log(`mapStateToProps/ProfilePage`,state.visitingUserImagesURLList);
    return {visitingUser: state.visitingUser, visitingUserImagesURLList: state.visitingUserImagesURLList,};
}
export default connect(mapStateToProps, {userImagesActionCreator:userImagesActionCreator})(ProfilePage);
type ReduxState = {
    visitingUser: VisitingUser;
    visitingUserImagesURLList: Array<string>;
};
type Props = {
    visitingUser: VisitingUser;
    userImagesActionCreator: Function;
    visitingUserImagesURLList: Array<string>;
};
type VisitingUser = {
    username: string;
    growwgramId: string;
    bio: string;
    followers: number;
    following: number;
    profilePicture: string;
    posts: number;
}