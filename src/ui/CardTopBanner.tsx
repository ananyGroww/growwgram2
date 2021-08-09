import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { faGrimace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectedUser } from '../actions';
import LocationOfPoster from '../common/Card/LocationOfPoster';
import NameOfPoster from '../common/Card/NameOfPoster';

class CardTopBanner extends React.Component<Props>{
    gotoProfile = () => {
        console.log(`gotoProfile/CardTopBanner`, this.props.imgMetaData.user);
        this.props.selectedUser(this.props.imgMetaData.user.username);
    }
    render(){
        return(
            <div className='CardTopBanner fs12'>
                <FontAwesomeIcon className='pfp0133CardTopBanner' icon={faGrimace} size='lg'/>
                {/* Q: Suppose `/profile`'s componentDidMount() is finished before the reducer of actionCreator (called in gotoProfile)
                        is finished. In this case an error will occur. How to catch and recover from this error? */}
                <ul>
                    <li>
                        <Link to='/profile'>
                            {/* Q: How to make below onClick work in <NameOfPoster/> so that I can remove this redundant <div/>? */}
                            <div onClick={this.gotoProfile}>
                                <NameOfPoster growwId={this.props.imgMetaData.user.instagram_username}/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <LocationOfPoster location={this.props.imgMetaData.location}/>
                    </li>
                </ul>
            </div>
        );
    }
}
// export default CardTopBanner;
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { selectedUser: selectedUser, })(CardTopBanner);
type Props = {
    imgMetaData: ImgMetaData;
    selectedUser: Function;
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