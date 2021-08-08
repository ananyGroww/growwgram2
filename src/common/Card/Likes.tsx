import React from 'react';

interface Props {
    noOfLikes: number;
    isLiked: boolean;
};
export default class Likes extends React.Component<Props>{
    render(){
        return(
            <div>
                isUpvoted? {this.props.isLiked}, noOfLikes: {this.props.noOfLikes}
            </div>
        );
    }
}