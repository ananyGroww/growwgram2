import React from 'react';

import { connect } from 'react-redux';

import { myProfileActionCreator } from '../actions';

class ProfilePage extends React.Component<Props>{
    render(){
        // const { visitingUser, } = this.props;
        // const { growwgramId, bio, followers, following, profilePicture, posts} = visitingUser;
        return(
            <div className='profile0133src'>
                {/* <div className='userInfo0133profile'>
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
                </div> */}
            </div>
        )
    };
    // renderPortfolioImagesWithDetails(){
    //     const { visitingUserImagesMetadata } = this.props;
    //     let cards:Array<JSX.Element> = [];
    //     for(let i = 0; i < visitingUserImagesMetadata.length; i++) {
    //         const { liked_by_user, alt_description, id, likes, urls,  } = visitingUserImagesMetadata[i];
    //         cards.push(
    //             <div>
    //                 <img
    //                     className='image'
    //                     key={id}
    //                     src={urls.regular}
    //                     alt={alt_description}
    //                 />
    //                 <div className='imageDetails0133portfolio'>
    //                     <ul className='list0133CardBottomBanner fs12'>
    //                         <li>
    //                             <Likes noOfLikes={likes} isLiked={liked_by_user}/>
    //                         </li>
    //                         <li>
    //                             <FontAwesomeIcon icon={faComment} size='lg'/>
    //                         </li>
    //                         <li className='push0133cardBottomBanner'>
    //                             <FontAwesomeIcon icon={faShareSquare} size='lg'/>
    //                         </li>
    //                         <li className='push0133cardBottomBanner'>
    //                             <FontAwesomeIcon icon={faBookmark} size='lg'/>
    //                         </li>
    //                     </ul>
    //                     <Caption caption={alt_description}/>
    //                 </div>
    //             </div>
    //         );
    //     }
    //     return cards;
    // };
    componentDidMount(){
        this.getMyProfile();
    }
    getMyProfile(){
        const nameOfMyProfile = `jpvalery`;
        myProfileActionCreator(nameOfMyProfile);
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {
        
    };
}
export default connect(
    mapStateToProps, {
        myProfileActionCreator: myProfileActionCreator,
    }
)(ProfilePage);
type ReduxState = {

};
type Props = {
    myProfileActionCreator: Function;
};