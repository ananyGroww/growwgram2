import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Caption from '../../common/Caption';
import { likePressActionCreator } from '../../store/actions';
import { ImgMetaData } from '../../utils/constants/actionReducerConstants';
import Likes from './Likes';

class CardBottomBanner extends React.Component<Props>{
    // https://reactjs.org/docs/faq-functions.html#class-properties-stage-3-proposal
    handleLike = () => {
        console.log(`handleLike/CardBottomBanner... pressed like, saving on cloud now...`);
        const { likePressActionCreator, imgMetaData } = this.props;
        const notify = () => toast.error(`Could not Like the post`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
        });
        // likePressActionCreator returns a promise
        likePressActionCreator(imgMetaData.id).catch(notify);
    }
    render(){
        const { likes, likedByUser, caption } =this.props.imgMetaData;
        
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
                <Caption caption={caption}/>
                {/* <div className='caption0133CardBottomBanner'>
                    {caption}
                </div> */}
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
type Props = {
    likePressActionCreator: Function;
    imgMetaData: ImgMetaData;
};
