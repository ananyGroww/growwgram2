import React from 'react';

import { connect } from 'react-redux';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { likePressActionCreator } from '../actions';
import Likes from '../common/Card/Likes';

class CardBottomBanner extends React.Component<Props>{
    // https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal
    handleLike = () => {
        console.log(`handleLike/CardBottomBanner... pressed like, saving on cloud now...`);
        const { likePressActionCreator, imgMetaData } = this.props;
        likePressActionCreator(imgMetaData.id);
        
    }
    render(){
        const { imgMetaData } = this.props;
        const { likes, likedByUser, caption } =imgMetaData;
        
        return(
            <div className='CardBottomBanner fs12'>
                <ul className='list0133CardBottomBanner'>
                    <li className='like' onClick={this.handleLike}>
                        <Likes noOfLikes={likes} isLiked={likedByUser}/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faComment} size='lg'/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faShareSquare} size='lg'/>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBookmark} size='lg'/>
                    </li>
                </ul>
                <div className='caption0133CardBottomBanner'>
                    {caption}
                </div>
                {/* <Caption caption={caption}/> */}
            </div>
        );
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
};
export default connect(mapStateToProps,{likePressActionCreator: likePressActionCreator,})(CardBottomBanner);
// export default CardBottomBanner;
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    loggedInProfile: string;
    userData: any,
};
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
    likePressActionCreator: Function;
    imgMetaData: ImgMetaData;
};
