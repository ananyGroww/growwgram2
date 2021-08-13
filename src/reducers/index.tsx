import { combineReducers } from 'redux';

import * as CONST from '../constants/actionReducerConstants';

export const imagesMetaDataReducer = (imagesMetaData:Array<CONST.ImgMetaData>=[], action:action) => {
    const { type, payload } = action;
    switch (type){
        case CONST.GET_NEW_PAGE: return [...imagesMetaData, ...payload.imagesObjList];
        case CONST.LIKE_THE_PHOTO: {console.log(`imagesMetaDataReducer/reducer... almost handled. Action:`, action); return changeLikeValue(imagesMetaData, action.payload);}
    }
    return imagesMetaData;
}
const changeLikeValue = (imagesMetaData:Array<CONST.ImgMetaData>, imgMetaDataXL:any) => {
    console.log(`Is changeLikeValue even running?`);
    let tempimagesMetaData:Array<CONST.ImgMetaData> = [];
    for( let i = 0; i < imagesMetaData.length ; i++ ){
        if( imagesMetaData[i].id === imgMetaDataXL.photo.id ){
            let tempimgMetaData:CONST.ImgMetaData = imagesMetaData[i];
            tempimgMetaData.likes = imgMetaDataXL.photos.likes;
            tempimgMetaData.likedByUser = imgMetaDataXL.photos.liked_by_user;
            tempimagesMetaData.push(tempimgMetaData);
        }
        else{
            tempimagesMetaData.push(imagesMetaData[i]);
        }
        
    }
    return tempimagesMetaData;
};

const myProfileMetaDataTemp = { growwgramId: 'emptyrightnow0133',name: '',bio: '',followers: 0,following: 0,total_photos: 0,pfpURL: '', }
export const myProfileReducer = (myProfileMetaData:CONST.myProfileMetaData = myProfileMetaDataTemp, action:action) => {
    if( action.type === CONST.LOGGED_IN_PROFILE ){
        return action.payload.myProfileMetaData;
    }
    return myProfileMetaData;
}
export const myPortfolioReducer = ( myPortfolio:Array<any>=[], action:action ) => {
    const { type, payload } = action;
    if( type === 'LOGGED_IN_PROFILE_PORTFOLIO'){
        return [...myPortfolio, ...payload.myProfileImagesMetaData];
    }
    else if ( type === 'CLEAR_MY_PORTFOLIO' ){
        return [];
    }
    return myPortfolio;
};

export const selectedUserImagesMetadataPortfolioReducer = (visitingUserImagesMetadata:Array<any> = [], action:action) => {
    const {type, payload} = action;
    if( type === CONST.USER_IMAGES_METADATA){
        return payload.userImagesMetaData;
    }
    return visitingUserImagesMetadata;
}
// Q: How to implement userData type in 1st parameter of userDataReducer?
// A: Do it here and make a  mess or add ?. in the type object to bypass this
export const visitSelectedUserReducer = (visitingUser:CONST.visitingUser = {}, action: action) => {
    // FEEDBACK: make a constant file const GET_..., and import it
    if( action.type === CONST.VISIT_SELECTED_USER ){
        const { username, name, bio, followers_count, following_count, profile_image, total_photos } = action.payload.userData.data;
        let userDataTemp:CONST.visitingUser = {
            name: name,
            growwgramId: username,
            bio: bio,
            followers: followers_count,
            following: following_count,
            pfpURL: profile_image.large,
            total_photos: total_photos,
        }
        return userDataTemp;
    }
    return visitingUser;
};

export default combineReducers({
    imagesMetaData: imagesMetaDataReducer,

    visitingUser: visitSelectedUserReducer,
    visitingUserImagesMetadata: selectedUserImagesMetadataPortfolioReducer,

    myProfileMetaData: myProfileReducer,
    myPortfolio: myPortfolioReducer,
});

type action = CONST.GET_NEW_PAGE_ACTION | CONST.LOGGED_IN_PROFILE_ACTION | CONST.USER_DATA_ACTION | 
    CONST.CHANGE_LIKE_VALUE_ACTION | CONST.USER_IMAGES_LIST_ACTION | CONST.USER_IMAGES_METADATA_ACTION | 
    CONST.LOGGED_IN_PROFILE_PORTFOLIO_ACTION;
