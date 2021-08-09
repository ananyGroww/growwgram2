import { combineReducers } from 'redux';

export const imagesMetaDataReducer = (imagesMetaData:Array<ImgMetaData>=[], action:action) => {
    switch (action.type){
        // Had to remove this one below coz: When coming from `/profile` back to `/`, the old data gets appended with the same new data, thus duplicates occur.
        // case 'GET_NEW_PAGE': return [...imagesMetaData, ...action.payload.imagesObjList];
        case 'GET_NEW_PAGE': return [...imagesMetaData, ...action.payload.imagesObjList];
        case 'CHANGE_LIKE_VALUE': {console.log(`imagesMetaDataReducer/reducer... almost handled`, action.payload); return helperLikePress(imagesMetaData, action);}
    }
    return imagesMetaData;
};
export const currentUserReducer = (username:string = '2renkov', action:action) => {
    if( action.type === 'LOGGED_IN_PROFILE' ){
        return action.payload.userName;
    }
    return username;
};
// Q: How to implement userData type in 1st parameter of userDataReducer?
export const userDataReducer = (userData:userData = {}, action: action) => {
    // make a constant file const GET_..., and import it
    if(action.type === 'GET_USER_PROFILE' || action.type === `SELECTED_USER`){
        console.log(`userDataReducer/reducers`, action);
        let userDataTemp:userData = {
            userName: action.payload.userData.data.username,
            growwgramId: action.payload.userData.data.instagram_username,
            bio: action.payload.userData.data.bio,
            followers: action.payload.userData.data.followers,
            following: action.payload.userData.data.following,
            profilePicture: action.payload.userData.data.profile_image.small,
        }
        return userDataTemp;
    }
    return userData;
}
// export const handleLikeReducer = (imagesMetaData:Array<ImgMetaData> =  [], action: action) => {
//     if(action.type=== 'CHANGE_LIKE_VALUE'){
//         let tempImgList:Array<ImgMetaData> = [];
//         for( let i = 0; i < imagesMetaData.length ; i++ ){
//             if(imagesMetaData[i].user.userName === action.payload.username){
//                 console.log(`handleLikeReducer/reducer... saved`)
//                 let imgMetaData:ImgMetaData = imagesMetaData[i];
//                 imgMetaData.user.userName = action.payload.username;
//                 tempImgList.push(imgMetaData);
//             }
//             else{
//                 tempImgList.push(imagesMetaData[i]);
//             }
//         }
//         return tempImgList;
//     }
//     return imagesMetaData;
// }
export default combineReducers({
    imagesMetaData: imagesMetaDataReducer,
    loggedInProfile: currentUserReducer,
    userData: userDataReducer,

});
const helperLikePress = (imagesMetaData:Array<ImgMetaData>=[], action:action) => {
    console.log(`Is handleLikeReducer even running?`,imagesMetaData.length);
    let tempImgList:Array<ImgMetaData> = [];
    for( let i = 0; i < imagesMetaData.length ; i++ ){
        console.log(`for loop issue: `,imagesMetaData[i].user.username);
        if(imagesMetaData[i].user.username === action.payload.username){
            console.log(`helperLikePress/reducer... saved`)
            let imgMetaData:ImgMetaData = imagesMetaData[i];
            imgMetaData.likedByUser = action.payload.isLiked;
            tempImgList.push(imgMetaData);
        }
        else{
            tempImgList.push(imagesMetaData[i]);
        }
    }
    return tempImgList;
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
type LIKE_ACTION = {
    type: string;
    payload: {
        username: string;
        isLiked: boolean;
    }
}
type action = GET_NEW_PAGE | LOGGED_IN_PROFILE | USER_DATA | LIKE_ACTION;
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
// to 
type userData = {
    userName?: string;
    growwgramId?: string;
    bio?: string;
    followers?: number;
    following?: number;
    profilePicture?: string;
}