import React from 'react';

import { connect } from 'react-redux';

class ProfilePage extends React.Component<Props>{
    render(){
        // UNABLE TO FORM A QUERY TO GET A USER'S INFO. 
        // THE API RETURNS 404, saying given username not found.
        // ISSUE HERE IS WHEN I DO `GET` ON A `username` (in sendNetworkRequest), THE API RETURNS `{
        //     "errors": [
        //         "Couldn't find User"
        //     ]
        // }` EVEN THO I SENT A `username` THEY SENT ME BACK! (in sendNetworkRequestRandomImg)
        console.log(`render/ProfilePage`, this.props.userData)
        return(
            <div>
                Basic Scaffolding: Profile Page
                {/* {this.props.user.name}, {this.props.user.total_likes}
                <ProfilePageCard user={this.props.user}/> */}
            </div>
        )
    };
}
const mapStateToProps = (state: ReduxState) => {
    console.log(`mapStateToProps/ProfilePage`,state);
    return { userData: state.userData}
}

export default connect(mapStateToProps)(ProfilePage);

type Props = {
    userData: any;
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
    loggedInProfile: string;
    userData: any,
};