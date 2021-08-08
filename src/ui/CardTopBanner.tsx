import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <div>
                {/* Q: Suppose `/profile`'s componentDidMount() is finished before the reducer of actionCreator (called in gotoProfile)
                        is finished. In this case an error will occur. How to catch and recover from this error? */}
                <Link to='/profile'>
                    <div onClick={this.gotoProfile}>
                        <NameOfPoster growwId={this.props.imgMetaData.user.instagram_username}/>
                    </div>
                </Link>
                <LocationOfPoster location={this.props.imgMetaData.location}/>
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