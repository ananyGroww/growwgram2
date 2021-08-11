import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { faGrimace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  userImagesMetadataActionCreator,
  visitSelectedUserActionCreator,
} from '../actions';

class CardTopBanner extends React.Component<Props>{
    render(){
        const { imgMetaData } = this.props;
        return(
            <div className='CardTopBanner fs12'>
                <FontAwesomeIcon className='pfp0133CardTopBanner' icon={faGrimace} size='lg'/>
                {/* Q: Suppose `/profile`'s componentDidMount() is finished before the reducer of actionCreator (called in gotoProfile)
                        is finished. In this case an error will occur. How to catch and recover from this error? */}
                <ul>
                    <li>
                        <Link to='/profile'>
                            {/* Q: How to make below onClick work in <NameOfPoster/> so that 
                                    I can remove this redundant <div/>? */}
                            <div onClick={this.gotoProfile} className='growwId0133CardTopBanner'>
                                {imgMetaData.user.username}
                            </div>
                        </Link>
                    </li>
                    <li>
                        {imgMetaData.location}
                    </li>
                </ul>
            </div>
        );
    };
    // THIS IS BROKEN IDK WHY
    gotoProfile = () => {
        const { username } = this.props.imgMetaData.user;
        console.log(`gotProfile/CardTopBanner is called.`);
        visitSelectedUserActionCreator(username);
        userImagesMetadataActionCreator(username);
    };
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { 
    visitSelectedUserActionCreator: visitSelectedUserActionCreator, 
    userImagesMetadataActionCreator: userImagesMetadataActionCreator,
})(CardTopBanner);
// Q: Do we have to include here what we have imported into props using the `mapStateToProps` function?
// A: Yes, we do!
type Props = {
    visitSelectedUserActionCreator: Function;
    userImagesMetadataActionCreator: Function;
    imgMetaData: ImgMetaData;
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
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    selectedUser: string;
};