import React from 'react';

import {
  faThumbsUp as regularthumb,
} from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidthumb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Likes = ({ noOfLikes, isLiked, }:Props) => {
    return(
        <div>
            {isLiked? <FontAwesomeIcon icon={solidthumb}/>: <FontAwesomeIcon icon={regularthumb}/> } {noOfLikes}
        </div>
    );
}
export default Likes;
// export default class Likes extends React.Component<Props>{
//     render(){
//         return(
//             <div>
//                 {this.props.isLiked? <FontAwesomeIcon icon={solidthumb}/>: <FontAwesomeIcon icon={regularthumb}/> } {this.props.noOfLikes}
//             </div>
//         );
//     }
// };

type Props = {
    noOfLikes: number;
    isLiked: boolean;
};
