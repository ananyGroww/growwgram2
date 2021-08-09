import React from 'react';

import CardPrimaryPicture from '../common/Card/CardPrimaryPicture';
import CardBottomBanner from './CardBottomBanner';
import CardTopBanner from './CardTopBanner';

class Card extends React.Component<Props>{
    render(){
        // console.log(`render./Card `,this.props.imgMetaData.url);
        const {index} = this.props;
        return(
            <div className='card'>
                <CardTopBanner index={index}/>
                <CardPrimaryPicture index={index}/>
                <CardBottomBanner index={index}/>
            </div>
        );
    }
}
export default Card;
type Props = {
    index: number;
};