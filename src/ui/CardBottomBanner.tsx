import React from 'react';

import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

interface ImgMetaData {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
type Props = {
    imgMetaData: ImgMetaData;
};

class CardBottomBanner extends React.Component<Props>{
    render(){
        return(
            <div>
                <Likes noOfLikes={this.props.imgMetaData.likes} isLiked={this.props.imgMetaData.likedByUser}/>
                <Caption caption={this.props.imgMetaData.caption}/>
            </div>
        );
    }
}
export default CardBottomBanner;