import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  visitUserImagesListActionCreator,
  visitUserProfileActionCreator,
} from '../../store/actions';
import { ImgMetaData } from '../../utils/constants/actionReducerConstants';

class CardTopBanner extends React.Component<Props>{
    render(){
        const { imgMetaData } = this.props;
        const { username, profile_image } = imgMetaData.user;
        return(
            <div className='CardTopBanner'>
                <img className='pfp0133CardTopBanner' src={profile_image.small} alt={username+`'s image`}/>
                <ul>
                    <li>
                        <Link to='/visituser'>
                            <div onClick={this.gotoProfile} className='growwId0133CardTopBanner fs16'>
                                {username}
                            </div>
                        </Link>
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
        
        // const notify = () => toast.info(`🦄 Visiting another user's profile coming soon!`, {
        //     position: "bottom-center",
        //     autoClose: 3000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     toastId: `32`,
        // });
        // if( !toast.isActive('32') )
        //     notify();
        const { visitUserProfileActionCreator, visitUserImagesListActionCreator, imgMetaData } = this.props;
        // console.log(`imgMetaData: `, imgMetaData);
        const { username, } = imgMetaData.user;
        // console.log(`gotoProfile/CardTopBanner is called.`);
        // visitUserProfileActionCreator(username);
        // visitUserImagesListActionCreator(username);


        const notify = () => toast.error(`Could not fetch ${username}'s profile data. Please go back`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        visitUserProfileActionCreator(username).catch(notify);
        const params = {
            pageno: 1,
            per_page: 20,
        };
        visitUserImagesListActionCreator(username, params).catch(notify);

    };
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { 
    visitUserProfileActionCreator: visitUserProfileActionCreator, 
    visitUserImagesListActionCreator: visitUserImagesListActionCreator,
})(CardTopBanner);
// Q: Do we have to include here what we have imported into props using the `mapStateToProps` function?
// A: Yes, we do!
type Props = {
    visitUserProfileActionCreator: Function;
    visitUserImagesListActionCreator: Function;
    imgMetaData: ImgMetaData;
}
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    selectedUser: string;
}