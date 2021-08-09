import React from 'react';

import { connect } from 'react-redux';

class ProfilePageCard extends React.Component<Props, State>{
    // get (list of images, caption, likes), total likes, name, location for user with userId stored in this.props.userData
    render(){
        // console.log(`render./Card `,this.props.imgMetaData.url);
        return(
            <div>
                {this.props.userData}
                {/* <CardPrimaryPicture imgMetaData={this.props?.user.}/>
                <CardBottomBanner imgMetaData={this.props.user.}/> */}
                <hr/>
            </div>
        );
    }
}
const mapStateToProps = (state:ReduxState) => {
    console.log(`mapStateToProps/ProfilePageCard`,state.userData);
    return {userData: state.userData};
}
export default connect(mapStateToProps, )(ProfilePageCard);
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
    userData: any;
};
type State = {
};