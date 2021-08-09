import { combineReducers } from 'redux';

export const imagesMetaDataReducer = (imagesMetaData:Array<ImgMetaData>=[], action:action) => {
    const { type, payload } = action;
    switch (type){
        // Had to remove this one below coz: When coming from `/profile` back to `/`, the old data gets appended with the same new data, thus duplicates occur.
        // case 'GET_NEW_PAGE': return [...imagesMetaData, ...action.payload.imagesObjList];
        case 'GET_NEW_PAGE': return [...imagesMetaData, ...payload.imagesObjList];
        case 'CHANGE_LIKE_VALUE': {console.log(`imagesMetaDataReducer/reducer... almost handled. Action:`, action); return changeLikeValue(payload.index, imagesMetaData);}
    }
    return imagesMetaData;
};
export const selectedUserImagesPortfolioReducer = (visitingUserImagesURLList:Array<string> = [], action:action) => {
    const {type, payload} = action;
    if(type==='USER_IMAGES_LIST'){
        console.log(`selectedUserImagesPortfolioReducer/reducer`,payload.userImagesURLList)
        return [...payload.userImagesURLList];
    }
    return visitingUserImagesURLList;
}
// Q: How to implement userData type in 1st parameter of userDataReducer?
export const visitSelectedUserReducer = (visitingUser:visitingUser = {}, action: action) => {
    // make a constant file const GET_..., and import it
    if(action.type === `VISIT_SELECTED_USER`){
        console.log(`userDataReducer/reducers`, action.payload.userData);
        const { username, instagram_username, bio, followers, following, profile_image, total_photos } = action.payload.userData.data;
        let userDataTemp:visitingUser = {
            username: username,
            growwgramId: instagram_username,
            bio: bio,
            followers: followers,
            following: following,
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
    visitingUserImagesURLList: selectedUserImagesPortfolioReducer,
});
const changeLikeValue = (index:number, imagesMetaData:Array<ImgMetaData>) => {
    console.log(`Is changeLikeValue even running?`);
    let tempimagesMetaData:Array<ImgMetaData> = [];
    for( let i = 0; i < imagesMetaData.length ; i++ ){
        let tempimgMetaData:ImgMetaData = imagesMetaData[i];
        if(i===index){
            // console.log(`helperLikePress/reducer... saved`);
            tempimgMetaData.likedByUser = !tempimgMetaData.likedByUser;
        }
        tempimagesMetaData.push(imagesMetaData[i]);
    }
    return tempimagesMetaData;
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
type action = GET_NEW_PAGE | LOGGED_IN_PROFILE | USER_DATA | CHANGE_LIKE_VALUE | USER_IMAGES_LIST;
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