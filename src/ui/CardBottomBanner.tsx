import React from 'react';

import { connect } from 'react-redux';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { likePressActionCreator } from '../actions';
import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

class CardBottomBanner extends React.Component<Props>{
    // https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal
    handleLike = () => {
        console.log(`handleLike/CardBottomBanner... pressed like`);
        const { likePressActionCreator, index } = this.props;
        likePressActionCreator(index);
    }
    render(){
        
        const {imagesMetaData, index} = this.props;
        const {likes, likedByUser, caption} = imagesMetaData[index];
        // const {handleLikePressActionCr} = this.props.handleLikePressActionCr;
        
        return(
            <div>
                <ul className='list0133CardBottomBanner fs12'>
                    <li onClick={this.handleLike}>
                    {/* <li> */}
                        <Likes noOfLikes={likes} isLiked={likedByUser}/>
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
                <Caption caption={caption}/>
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
    index: number;
    imagesMetaData: Array<ImgMetaData>;
    likePressActionCreator: Function;
};
