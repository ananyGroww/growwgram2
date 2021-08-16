import axios from 'axios';

import * as CONST from '../../utils/constants/actionReducerConstants';

export const getNewPageActionCreator = (itemsPerPage:number = 10) => {
    return async function (dispatch:Function, getState:object){
        try{   
            const response1:any = await sendNetworkRequest(`/photos/random`, { 
                query: 'forest mountain', 
                count: itemsPerPage,
            });
            let imgObjList = cleanedResponseforNewsFeed(response1);
            dispatch({
                type: CONST.GET_NEW_PAGE,
                payload:{
                    imagesObjList: imgObjList,
                }
            });
        }catch(err){
            console.log(`Err occured when fetching new posts for 
                news feed. Details: `, err);
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not fetch posts. Please Shift reload`});
        }
    }
};

export const myProfileActionCreator = (username:string = '2renkov') => { 
    return async function (dispatch:Function, getState:object){
        try{
            const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
            const myProfileMetaData:CONST.TempObj = cleanedResponseforMyProfile(response1);
            dispatch({
                    type: CONST.LOGGED_IN_PROFILE,
                    payload:{
                        myProfileMetaData: myProfileMetaData,
                    },
            });
        }catch(err){
            console.log(`Err occured when fetching information about your account. Details: `, err);
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not fetch details about your profile. Please Shift reload`});
        }
    }
}
export const myImagesListActionCreator = (username:string, params:CONST.ParamsPortfolioImages) => {
    const { pageno, per_page } = params;
    return async function (dispatch:Function, getState:object){
        // check if localstorage has data. if not, do net rqst
        try{
            const response1:any = await sendNetworkRequest(`/users/${username}/photos`, { 
                username: username, 
                page: pageno,
                per_page: per_page,
            });
            const imgObjList = cleanedResponseforMyPortfolio(response1);
            dispatch({
                    type: CONST.LOGGED_IN_PROFILE_PORTFOLIO,
                    payload:{
                        // myProfileImagesMetaData: response1.data,
                        myProfileImagesMetaData: imgObjList,
                    },
            });
        }catch(err){
            console.log(`Err occured when fetching your (the logged in user) 
                portfolio of images from the server.`, err);
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not fetch details about your profile. Please Shift reload`});
        }
    }
};

export const visitSelectedUserActionCreator = (username:string = 'fakurian') => {
    return async function (dispatch:Function, getState:object){
        try{
            const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
            dispatch({
                    type: CONST.VISIT_SELECTED_USER,
                    payload:{
                        userData: response1,
                    },
            });
        }catch(err){
            console.log(`Err occured when trying to visit the selected user 
                (Possible wrong API call). Details: `, err);
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not fetch details about ${username}'s profile. Please Shift reload`});
        }
    }
}
export const userImagesMetadataActionCreator = (username:string = '2renkov', pageno:Number = 1) => {
    return async function (dispatch:Function, getState:object){
        try{
            const response1:any = await sendNetworkRequest(`/users/${username}/photos`, { 
                username: username, 
                page: pageno, 
                per_page:10,
            });
            let userImagesMetaData:Array<any> = response1.data.map( (imgMetaData:any) => imgMetaData );
            dispatch({
                    type: CONST.USER_IMAGES_METADATA,
                    payload:{
                        userImagesMetaData: userImagesMetaData,
                    }
            });
        }catch(err){
            console.log(`Err occured fetching the images of the user you are 
                visitng currently. Details: `, err);
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not fetch details about ${username}'s profile. Please Shift reload`});
        }
    }
};

export const likePressActionCreator = (id:string) => {
    return async function (dispatch:Function, getState:object){
        try{
            const response1:any = await axios.post(`https://api.unsplash.com/photos/${id}/like`, {
                params: { id: id},
                headers: {
                        Authorization: 'Client-ID 5TN16pc1ZRFpinyndwixG65CXhFW0rcYutEP6l9jdIw',
                    }
            });
            dispatch({
                    type: CONST.LIKE_THE_PHOTO,
                    payload:{
                        imgMetaDataXL: response1,
                    },
            });
        }catch(err){
            console.log(`Err occured when sending like request using API. 
                Details: `, err);
            // return Promise.reject(new Error(`Could not Like the post`));
            // This is not optimal because a reject() should always have Error object
            // https://javascript.info/promise-basics#:~:text=Reject%20with%20Error%20objects
            return Promise.reject({message:`Could not Like the post`});
        }
    }
};

const cleanedResponseforMyProfile = (response:any):CONST.TempObj => {
    const { bio, followers_count, following_count, username, total_photos, name, profile_image } = response.data;
    let tempObj:CONST.TempObj = {
        growwgramId: username,
        name: name,
        bio: bio,
        followers: followers_count,
        following: following_count,
        total_photos: total_photos,
        pfpURL: profile_image.medium,
    }
    return tempObj;
}
const cleanedResponseforNewsFeed = (response:any):Array<CONST.ImgMetaData> => {
    let imagesObj:any = response.data;
    let tempImgList:Array<CONST.ImgMetaData> = imagesObj.map( (imageObj:any) => {
        const { urls,description,likes,id,liked_by_user,location,user } = imageObj;
        let image:CONST.ImgMetaData = {
            url: urls.regular,
            caption: description,
            likes: likes,
            id: id,
            likedByUser: liked_by_user,
            location: location.name,
            user:user,
        };
        return image;
    } );
    return tempImgList;
}
const cleanedResponseforMyPortfolio = (response:any):Array<CONST.ImgMetaData> => {
    let imagesObj:any = response.data;
    let tempImgList:Array<CONST.ImgMetaData> = imagesObj.map( (imageObj:any) => {
        const { urls,alt_description,likes,id,liked_by_user,location,user } = imageObj;
        let image:CONST.ImgMetaData = {
            url: urls.regular,
            caption: alt_description,
            likes: likes,
            id: id,
            likedByUser: liked_by_user,
            location: location?.name,
            user:user,
        };
        return image;
    } );
    return tempImgList;
}
const sendNetworkRequest = async (URI:string, params:Object):Promise<any> => {
    let response:any = await axios.get(`https://api.unsplash.com${URI}`, {
        params: params,
        headers: {
                Authorization: 'Client-ID 5TN16pc1ZRFpinyndwixG65CXhFW0rcYutEP6l9jdIw'
            }
    });
    return response;
}
