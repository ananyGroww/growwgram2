import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { faGrimace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { visitSelectedUserActionCreator } from '../actions';
import LocationOfPoster from '../common/Card/LocationOfPoster';
import NameOfPoster from '../common/Card/NameOfPoster';

class CardTopBanner extends React.Component<Props>{
    gotoProfile = () => {
        const { imagesMetaData, index, visitSelectedUserActionCreator } = this.props;
        const { username } = imagesMetaData[index].user;
        console.log(`gotoProfile/CardTopBanner`, imagesMetaData[index].user);
        visitSelectedUserActionCreator(index, username);
    }
    render(){
        const { imagesMetaData, index } = this.props;
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
                                <NameOfPoster growwId={imagesMetaData[index].user.instagram_username}/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <LocationOfPoster location={imagesMetaData[index].location}/>
                    </li>
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { visitSelectedUserActionCreator: visitSelectedUserActionCreator, })(CardTopBanner);
// Q: Don't we have to include here what we have imported into props using then mapStateToProps function?
// A: Yes, we do!
type Props = {
    index: number;
    visitSelectedUserActionCreator: Function;
    imagesMetaData: Array<ImgMetaData>;
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