import './Card.css';

import React from 'react';

import CardBottomBanner from './CardBottomBanner';
import CardPrimaryPicture from './CardPrimaryPicture';
import CardTopBanner from './CardTopBanner';

class Card extends React.Component<Props>{
    render(){
        // console.log(`render./Card `,this.props.imgMetaData.url);
        const { imgMetaData } = this.props;
        return(
            <div className='card'>
                <CardTopBanner imgMetaData={imgMetaData}/>
                <CardPrimaryPicture imgMetaData={imgMetaData}/>
                <CardBottomBanner imgMetaData={imgMetaData}/>
            </div>
        );
    }
    constructor(props:Props){
        super(props);
        this.state = {
            imgMetaData: this.props.imgMetaData,
        }
    };
}
export default Card;
type Props = {
    index: number;
    imgMetaData: ImgMetaData;
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