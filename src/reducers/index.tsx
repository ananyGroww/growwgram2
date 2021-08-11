import { combineReducers } from 'redux';

export const imagesMetaDataReducer = (imagesMetaData:Array<ImgMetaData>=[], action:action) => {
    const { type, payload } = action;
    switch (type){
        case 'GET_NEW_PAGE': return [...imagesMetaData, ...payload.imagesObjList];
        case 'CHANGE_LIKE_VALUE': {console.log(`imagesMetaDataReducer/reducer... almost handled. Action:`, action); return changeLikeValue(payload.index, imagesMetaData);}
    }
    return imagesMetaData;
};
export const selectedUserImagesMetadataPortfolioReducer = (visitingUserImagesMetadata:Array<any> = [], action:action) => {
    const {type, payload} = action;
    if(type==='USER_IMAGES_METADATA'){
        return payload.userImagesMetaData;
    }
    return visitingUserImagesMetadata;
}
// Q: How to implement userData type in 1st parameter of userDataReducer?
// A: Do it here and make a  mess or add ?. in the type object to bypass this
export const visitSelectedUserReducer = (visitingUser:visitingUser = {}, action: action) => {
    // FEEDBACK: make a constant file const GET_..., and import it
    if(action.type === `VISIT_SELECTED_USER`){
        const { username, instagram_username, bio, followers_count, following_count, profile_image, total_photos } = action.payload.userData.data;
        let userDataTemp:visitingUser = {
            username: username,
            growwgramId: instagram_username,
            bio: bio,
            followers: followers_count,
            following: following_count,
            profilePicture: profile_image.large,
            posts: total_photos,
        }
        return userDataTemp;
    }
    return visitingUser;
};

// Function currently not in use
export const currentUserReducer = (username:string = '2renkov', action:action) => {
    if( action.type === 'LOGGED_IN_PROFILE' ){
        return action.payload.userName;
    }
    return username;
};
export default combineReducers({
    imagesMetaData: imagesMetaDataReducer,
    loggedInProfile: currentUserReducer,
    visitingUser: visitSelectedUserReducer,
    visitingUserImagesMetadata: selectedUserImagesMetadataPortfolioReducer,
});

const changeLikeValue = (index:number, imagesMetaData:Array<ImgMetaData>) => {
    console.log(`Is changeLikeValue even running?`);
    let tempimagesMetaData:Array<ImgMetaData> = [];
    for( let i = 0; i < imagesMetaData.length ; i++ ){
        let tempimgMetaData:ImgMetaData = imagesMetaData[i];
        if(i===index){
            tempimgMetaData.likes = updatedNoOfLikes(tempimgMetaData);
            tempimgMetaData.likedByUser = !tempimgMetaData.likedByUser;
        }
        tempimagesMetaData.push(imagesMetaData[i]);
    }
    return tempimagesMetaData;
}
const updatedNoOfLikes = (imgMetaData:ImgMetaData):number => {
    if(imgMetaData.likedByUser===true){
        return imgMetaData.likes-1;
    }
    return imgMetaData.likes+1;
}
type GET_NEW_PAGE = {
    type: string;
    payload:{
        imagesObjList: Array<ImgMetaData>,
    };
};
type LOGGED_IN_PROFILE = {
    type: string;
    payload: {
        userName: string,
    };
};
type USER_DATA = {
    type: string;
    payload: any;
};
type CHANGE_LIKE_VALUE = {
    type: string;
    payload: {
        index: number;
    }
}
type USER_IMAGES_LIST = {
    type: string;
    payload: {
        userImagesURLList: Array<string>;
    }
};
type USER_IMAGES_METADATA = {
    type: string;
    payload: {
        userImagesURLList: Array<any>;
    }
};
type action = GET_NEW_PAGE | LOGGED_IN_PROFILE | USER_DATA | CHANGE_LIKE_VALUE | USER_IMAGES_LIST | USER_IMAGES_METADATA;
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
// If you don't want to initialize obj in argument list line, then add ?. here
type visitingUser = {
    username?: string;
    growwgramId?: string;
    bio?: string;
    followers?: number;
    following?: number;
    profilePicture?: string;
    posts?: number;
}