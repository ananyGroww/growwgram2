import '../../ui/card/Card.css';

import React from 'react';

import { ImgMetaData } from '../../utils/constants/actionReducerConstants';
import CardBottomBanner from '../card/CardBottomBanner';

const ProfilePageCard = ({ imgMetaData, }:Props) => {
    const { caption, url, } = imgMetaData;
    return(
        <div key='id'>
            <img className='profileCardImage' src={url} alt={caption} />
            <CardBottomBanner imgMetaData={imgMetaData}/>
        </div>
    );
}
export default ProfilePageCard;
// class ProfilePageCard extends React.Component<Props>{
//     render(){
//         // const { liked_by_user, alt_description, id, likes, urls,  } = this.props.imgMetaData;
//         // const { alt_description, urls } = this.props.imgMetaData;
//         const { caption, url } = this.props.imgMetaData;
//         return(
//             <div key='id'>
//                     <img
//                         className='profileCardImage'
//                         // src={urls.regular}
//                         // alt={alt_description}
//                         src={url}
//                         alt={caption}
//                     />
//                     <CardBottomBanner imgMetaData={this.props.imgMetaData}/>
//                     {/* <div className='imageDetails0133portfolio'>
//                         <ul className='list0133CardBottomBanner fs12'>
//                             <li key={`${id}+likes`}>
//                                 <Likes noOfLikes={likes} isLiked={liked_by_user}/>
//                             </li>
//                             <li key={`${id}+comment}`}>
//                                 <FontAwesomeIcon icon={faComment} size='lg'/>
//                             </li>
//                             <li key={`${id}+share`} className='push0133cardBottomBanner'>
//                                 <FontAwesomeIcon icon={faShareSquare} size='lg'/>
//                             </li>
//                             <li key={`${id}+bookmark`} className='push0133cardBottomBanner'>
//                                 <FontAwesomeIcon icon={faBookmark} size='lg'/>
//                             </li>
//                         </ul>
//                         <Caption caption={alt_description}/>
//                     </div> */}
//                 </div>
//         );
//     }
// }

type Props = {
    imgMetaData: ImgMetaData;
};