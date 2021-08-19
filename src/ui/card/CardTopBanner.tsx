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

const CardTopBanner = ({ imgMetaData, visitUserImagesListActionCreator, visitUserProfileActionCreator, }:Props) => {
    const { username, profile_image } = imgMetaData.user;
    const gotoProfile = () => {
        // const { visitUserProfileActionCreator, visitUserImagesListActionCreator, imgMetaData } = this.props;
        const { username, } = imgMetaData.user;

        const duration:number = 5000;
        visitUserProfileActionCreator(username).catch( () => notify(username, duration) );

        const params = {
            pageno: 1,
            per_page: 20,
        };
        visitUserImagesListActionCreator(username, params).catch(notify);

    };
    return(
        <div className='CardTopBanner'>
            <img className='pfp0133CardTopBanner' src={profile_image.small} alt={username+`'s image`}/>
            <ul>
                <li onClick={gotoProfile} className='growwId0133CardTopBanner fs16'>
                    <Link to='/visituser'>{username}</Link>
                </li>
                <li>{imgMetaData.location}</li>
            </ul>
        </div>
    );
};
const notify = (username:string, duration:number) => toast.error(`Could not fetch ${username}'s profile data. Please go back`, {
    position: "bottom-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
// class CardTopBanner extends React.Component<Props>{
//     render(){
//         const { imgMetaData } = this.props;
//         const { username, profile_image } = imgMetaData.user;
//         return(
//             <div className='CardTopBanner'>
//                 <img className='pfp0133CardTopBanner' src={profile_image.small} alt={username+`'s image`}/>
//                 <ul>
//                     <li>
//                         <Link to='/visituser'>
//                             <div onClick={this.gotoProfile} className='growwId0133CardTopBanner fs16'>
//                                 {username}
//                             </div>
//                         </Link>
//                     </li>
//                     <li>
//                         {imgMetaData.location}
//                     </li>
//                 </ul>
//                 {/* <ToastContainer limit={1}/> */}
//             </div>
//         );
//     };
//     gotoProfile = () => {
//         const { visitUserProfileActionCreator, visitUserImagesListActionCreator, imgMetaData } = this.props;
//         const { username, } = imgMetaData.user;

//         const notify = () => toast.error(`Could not fetch ${username}'s profile data. Please go back`, {
//             position: "bottom-center",
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//         visitUserProfileActionCreator(username).catch(notify);

//         const params = {
//             pageno: 1,
//             per_page: 20,
//         };
//         visitUserImagesListActionCreator(username, params).catch(notify);

//     };
// }

const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
};
export default connect(mapStateToProps, { 
    visitUserProfileActionCreator: visitUserProfileActionCreator, 
    visitUserImagesListActionCreator: visitUserImagesListActionCreator,
})(CardTopBanner);

type Props = {
    visitUserProfileActionCreator: Function;
    visitUserImagesListActionCreator: Function;
    imgMetaData: ImgMetaData;
};
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    selectedUser: string;
};