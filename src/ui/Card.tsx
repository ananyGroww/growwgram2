import React from 'react';

import CardPrimaryPicture from '../common/Card/CardPrimaryPicture';
import CardBottomBanner from './CardBottomBanner';
import CardTopBanner from './CardTopBanner';

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
type State = {
};
class Card extends React.Component<Props, State>{
    render(){
        // console.log(`render./Card `,this.props.imgMetaData.url);
        return(
            <div>
                <CardTopBanner imgMetaData={this.props.imgMetaData}/>
                <CardPrimaryPicture imgMetaData={this.props.imgMetaData}/>
                <CardBottomBanner imgMetaData={this.props.imgMetaData}/>
                <hr/>
            </div>
        );
    }
}
export default Card;