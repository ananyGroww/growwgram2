import { combineReducers } from 'redux';

export const imagesMetaDataReducer = (imagesMetaData:Array<ImgMetaData>=[], action:action) => {
    switch (action.type){
        // Had to remove this one below coz: When coming from `/profile` back to `/`, the old data gets appended with the same new data, thus duplicates occur.
        // case 'GET_NEW_PAGE': return [...imagesMetaData, ...action.payload.imagesObjList];
        case 'GET_NEW_PAGE': return [...imagesMetaData, ...action.payload.imagesObjList];
    }
    return imagesMetaData;
};
export const currentUserReducer = (username:string = '2renkov', action:action) => {
    if( action.type === 'LOGGED_IN_PROFILE' ){
        return action.payload.userName;
    }
    return username;
};
export const userDataReducer = (userData: Object = {}, action: action) => {
    if(action.type === 'GET_USER_PROFILE' || action.type === `SELECTED_USER`){
        console.log(`userDataReducer/reducers`, action);
        return action.payload.userData;
    }
    return userData;
}
export default combineReducers({
    imagesMetaData: imagesMetaDataReducer,
    loggedInProfile: currentUserReducer,
    userData: userDataReducer,
});
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
type action = GET_NEW_PAGE | LOGGED_IN_PROFILE | USER_DATA;
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};