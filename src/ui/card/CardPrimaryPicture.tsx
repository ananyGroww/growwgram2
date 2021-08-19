import React from 'react';

import { connect } from 'react-redux';

import { ImgMetaData } from '../../utils/constants/actionReducerConstants';

const CardPrimaryPicture = ({ imgMetaData, }:Props) => {
    const { url, caption } = imgMetaData;

    return(
        <img className='image' src={url} alt={caption}/>
    );
};
// class CardPrimaryPicture extends React.Component<Props>{
//     render(){
//         const { url, caption } = this.props.imgMetaData;
//         return(
//             <div>
//                 {/* <img className='image' src={imagesMetaData[index].url} alt={imagesMetaData[index].caption}/> */}
//                 <img className='image' src={url} alt={caption}/>
//             </div>
//         );
//     }
// }

const mapStateToProps = (state:ReduxState) => {
    return({imagesMetaData: state.imagesMetaData});
};

export default connect(mapStateToProps)(CardPrimaryPicture);

type Props = {
    imgMetaData: ImgMetaData;
};
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
};