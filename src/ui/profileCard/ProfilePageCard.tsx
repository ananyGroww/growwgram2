import '../../ui/card/Card.css';

import React from 'react';

import CardBottomBanner from '../card/CardBottomBanner';

// import {
//   faBookmark,
//   faComment,
//   faShareSquare,
// } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import Caption from '../../common/Caption';
// import Likes from '../../ui/card/Likes';

class ProfilePageCard extends React.Component<Props>{
    render(){
        // const { liked_by_user, alt_description, id, likes, urls,  } = this.props.imgMetaData;
        // const { alt_description, urls } = this.props.imgMetaData;
        const { caption, url } = this.props.imgMetaData;
        return(
            <div key='id'>
                    <img
                        className='profileCardImage'
                        // src={urls.regular}
                        // alt={alt_description}
                        src={url}
                        alt={caption}
                    />
                    <CardBottomBanner imgMetaData={this.props.imgMetaData}/>
                    {/* <div className='imageDetails0133portfolio'>
                        <ul className='list0133CardBottomBanner fs12'>
                            <li key={`${id}+likes`}>
                                <Likes noOfLikes={likes} isLiked={liked_by_user}/>
                            </li>
                            <li key={`${id}+comment}`}>
                                <FontAwesomeIcon icon={faComment} size='lg'/>
                            </li>
                            <li key={`${id}+share`} className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faShareSquare} size='lg'/>
                            </li>
                            <li key={`${id}+bookmark`} className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faBookmark} size='lg'/>
                            </li>
                        </ul>
                        <Caption caption={alt_description}/>
                    </div> */}
                </div>
        );
    }
}
export default ProfilePageCard;
type Props = {
    imgMetaData: any;
};