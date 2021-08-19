import './Card.css';

import React from 'react';

import { ImgMetaData } from '../../utils/constants/actionReducerConstants';
import CardBottomBanner from './CardBottomBanner';
import CardPrimaryPicture from './CardPrimaryPicture';
import CardTopBanner from './CardTopBanner';

const Card = ({ imgMetaData, }:Props) => {
    return(
        <div className='card'>
            <CardTopBanner imgMetaData={imgMetaData}/>
            <CardPrimaryPicture imgMetaData={imgMetaData}/>
            <CardBottomBanner imgMetaData={imgMetaData}/>
        </div>
    );
};
export default Card;

type Props = {
    index?: number;
    imgMetaData: ImgMetaData;
};