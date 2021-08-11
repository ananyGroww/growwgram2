import React from 'react';

import { connect } from 'react-redux';

class CardPrimaryPicture extends React.Component<Props>{
    render(){
        const { imgMetaData } = this.props;
        return(
            <div>
                {/* <img className='image' src={imagesMetaData[index].url} alt={imagesMetaData[index].caption}/> */}
                <img className='image' src={imgMetaData.url} alt={imgMetaData.caption}/>
            </div>
        );
    }
}
const mapStateToProps = (state:ReduxState) => {
    return({imagesMetaData: state.imagesMetaData});
}
export default connect(mapStateToProps)(CardPrimaryPicture);
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
}
type Props = {
    imgMetaData: ImgMetaData;
};
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    selectedUser: string;
};