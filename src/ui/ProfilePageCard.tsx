import React from 'react';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

class ProfilePageCard extends React.Component<Props>{
    // get (list of images, caption, likes), total likes, name, location for user with userId stored in this.props.userData
    render(){
        const { liked_by_user, alt_description, id, likes, urls,  } = this.props.imgMetaData;
        return(
            <div key='id'>
                    <img
                        className='image'
                        src={urls.regular}
                        alt={alt_description}
                    />
                    <div className='imageDetails0133portfolio'>
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
                    </div>
                </div>
        );
    }
}
export default ProfilePageCard;
type Props = {
    imgMetaData: any;
};