import React from 'react';

import {
  faThumbsUp as regularthumb,
} from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidthumb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    noOfLikes: number;
    isLiked: boolean;
};

// adding comment to learn git: ignore
export default class Likes extends React.Component<Props>{
    render(){
        return(
            <div>
                {/* https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react */}
                {/* Q: How to make onClick work on FontAweseomeIcon so that when clicked, i can change isLiked prop? */}
                {this.props.isLiked? <FontAwesomeIcon icon={solidthumb}/>: <FontAwesomeIcon icon={regularthumb}/> } {this.props.noOfLikes}
            </div>
        );
    }
}