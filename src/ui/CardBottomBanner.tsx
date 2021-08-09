import React from 'react';

import { connect } from 'react-redux';

import {
  faBookmark,
  faComment,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleLikePressActionCr } from '../actions';
import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

class CardBottomBanner extends React.Component<Props>{
    // https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal
    handleLike = () => {
        console.log(`handleLike/CardBottomBanner... pressed like`);
        this.props.handleLikePressActionCr(this.props.imgMetaData.user.username, !this.props.imgMetaData.likedByUser);
    }
    render(){
        const {likedByUser, caption, likes} = this.props.imgMetaData;
        // const {handleLikePressActionCr} = this.props.handleLikePressActionCr;
        
        return(
            <div>
                <ul className='list0133CardBottomBanner fs12'>
                    <li onClick={this.handleLike}>
                        {/* <Likes noOfLikes={likes} isLiked={likedByUser}/> */}
                        <Likes noOfLikes={likes} isLiked={true}/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faComment} size='lg'/>
                    </li>
                    <li className='push0133cardBottomBanner'>
                        <FontAwesomeIcon icon={faBookmark} size='lg'/>
                    </li>
                </ul>
                <Caption caption={caption}/>
            </div>
        );
    }
}
const mapStateToProps = () => {
    return {};
};
export default connect(mapStateToProps,{handleLikePressActionCr: handleLikePressActionCr,})(CardBottomBanner);
// export default CardBottomBanner;
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
type Props = {
    imgMetaData: ImgMetaData;
    handleLikePressActionCr: Function;
};
