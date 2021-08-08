import React from 'react';

interface ImgMetaData {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
}
type Props = {
    imgMetaData: ImgMetaData;
}
type State = {
};
export default class CardPrimaryPicture extends React.Component<Props, State>{
    render(){
        return(
            <div>
                <img src={this.props.imgMetaData.url} alt={this.props.imgMetaData.caption}/>
            </div>
        );
    }
}