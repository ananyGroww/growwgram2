import React from 'react';

import { connect } from 'react-redux';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userImagesMetadataActionCreator } from '../actions';
import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

class ProfilePage extends React.Component<Props, State>{
    componentDidMount(){
        const { visitingUser, userImagesMetadataActionCreator} = this.props;
        console.log(`componentDidMount/ProfilePage isn't being called on 1st time.`);
        userImagesMetadataActionCreator(visitingUser.username, 1);
    }
    renderPortfolioImagesWithDetails(){
        const { visitingUserImagesMetadata } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < visitingUserImagesMetadata.length; i++) {
            const { liked_by_user, alt_description, id, likes, urls,  } = visitingUserImagesMetadata[i];
            cards.push(
                <div>
                    <img
                        className='image'
                        key={id}
                        src={urls.regular}
                        alt={alt_description}
                    />
                    <div className='imageDetails0133portfolio'>
                        <ul className='list0133CardBottomBanner fs12'>
                            <li>
                                <Likes noOfLikes={likes} isLiked={liked_by_user}/>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faComment} size='lg'/>
                            </li>
                            <li className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faShareSquare} size='lg'/>
                            </li>
                            <li className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faBookmark} size='lg'/>
                            </li>
                        </ul>
                        <Caption caption={alt_description}/>
                    </div>
                </div>
            );
        }
        return cards;
    }
    render(){
        const { visitingUser, } = this.props;
        const { growwgramId, bio, followers, following, profilePicture, posts} = visitingUser;
        return(
            <div className='profile0133src'>
                <div className='userInfo0133profile'>
                    <div className='pfp0133userInfo'>
                        <img className='image' src={profilePicture} alt='Profile'/>
                    </div>
                    <ul className='stats0133userInfo'>
                        <li key={growwgramId} className='growwgramId0133stats fs12'>{growwgramId}</li>
                        <li key={followers}>Followers {followers?followers:0}</li>
                        <li key={following}>Following {following?following:0}</li>
                        <li key={posts}>Posts {posts}</li>
                        <li key={bio}>{bio}</li>
                    </ul>
                </div>
                
                <div className='portfolio0133profile'>
                    {this.renderPortfolioImagesWithDetails()}
                </div>
            </div>
        )
    };
}
const mapStateToProps = (state:ReduxState) => {
    return {
        visitingUser: state.visitingUser, 
        visitingUserImagesMetadata:state.visitingUserImagesMetadata,
        userImagesMetadataActionCreator:userImagesMetadataActionCreator,
    };
}
export default connect(
    mapStateToProps, 
    {
        userImagesMetadataActionCreator:userImagesMetadataActionCreator,
    }
)(ProfilePage);
type ReduxState = {
    visitingUser: VisitingUser;
    visitingUserImagesMetadata: Array<any>;
};
type Props = {
    visitingUser: VisitingUser;
    userImagesActionCreator: Function;
    userImagesMetadataActionCreator: Function;
    visitingUserImagesMetadata: Array<any>;
};
type State = {
    portfolioPageNo:number;
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