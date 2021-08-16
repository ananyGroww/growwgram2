import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  userImagesMetadataActionCreator,
  visitSelectedUserActionCreator,
} from '../../store/actions';
import { ImgMetaData } from '../../utils/constants/actionReducerConstants';

class CardTopBanner extends React.Component<Props>{
    render(){
        const { imgMetaData } = this.props;
        const { username, profile_image } = imgMetaData.user;
        return(
            <div className='CardTopBanner fs12'>
                <img className='pfp0133CardTopBanner' src={profile_image.small} alt={username+`'s image`}/>
                <ul>
                    <li>
                        {/* <Link to='/profile'> */}
                            <div onClick={this.gotoProfile} className='growwId0133CardTopBanner'>
                                {username}
                            </div>
                        {/* </Link> */}
                    </li>
                    <li>
                        {imgMetaData.location}
                    </li>
                </ul>
                {/* <ToastContainer limit={1}/> */}
            </div>
        );
    };
    // THIS IS BROKEN IDK WHY
    // A: Like reduxstate data, action creators should be called with `this.props.`, not alone/direct call
    gotoProfile = () => {
        
        const notify = () => toast.info(`🦄 Visiting another user's profile coming soon!`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            toastId: `32`,
        });
        if( !toast.isActive('32') )
            notify();
        // const { visitSelectedUserActionCreator, userImagesMetadataActionCreator, imgMetaData } = this.props;
        // const { username, } = imgMetaData.user;
        // console.log(`gotoProfile/CardTopBanner is called.`);
        // visitSelectedUserActionCreator(username);
        // userImagesMetadataActionCreator(username);
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
}
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    selectedUser: string;
}