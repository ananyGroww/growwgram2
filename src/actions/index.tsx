import axios from 'axios';

// FEEDBACK: define actions with [functionname]action
export const getNewPage = (itemsPerPage:number = 10) => {
    return async function (dispatch:Function, getState:object){
        const response1:any = await sendNetworkRequest(`/photos/random`, { query: 'technology', count: itemsPerPage });
        let imgObjList = cleanedResponseforNewsFeed(response1);
        dispatch({
                type: 'GET_NEW_PAGE',
                payload:{
                    imagesObjList: imgObjList,
                }
        }); 
    }
}
export const userImagesMetadataActionCreator = (username:string = '2renkov', pageno:Number = 1) => {
    console.log(`userImagesMetadataActionCreator/actioncreator: `, username);
    return async function (dispatch:Function, getState:object){
        console.log(`crafting query @ userImagesMetadataActionCreator/actioncreator`);
        const response1:any = await sendNetworkRequest(`/users/${username}/photos`, { username: username, page: pageno, per_page:10});
        console.log(`response received @ userImagesMetadataActionCreator/actioncreator`);
        let userImagesMetaData:Array<any> = response1.data.map( (imgMetaData:any) => imgMetaData );
        dispatch({
                type: 'USER_IMAGES_METADATA',
                payload:{
                    userImagesMetaData: userImagesMetaData,
                }
        }); 
    }
};
export const visitSelectedUserActionCreator = (username:string = 'fakurian') => {
    console.log(`visitSelectedUserActionCreator/actioncreator: `, username);
    return async function (dispatch:Function, getState:object){
        // const response = await sendNetworkRequest(itemsPerPage);
        try{
            console.log(`crafting query @visitSelectedUserActionCreator`);
            const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
            console.log(`response received @visitSelectedUserActionCreator`);
            dispatch({
                    type: 'VISIT_SELECTED_USER',
                    payload:{
                        userData: response1,
                    },
            });
        }catch(err){
            console.log(`errorCatch<==>visitSelectedUser/actionCreators`, err);
            dispatch({
                type: 'VISIT_SELECTED_USER',
                payload:{
                    userData: `Error occured`,
                }
            });
        }
    }
};
// export const visitSelectedUserActionCreator = (index:number = 1, username:string = '2renkov') => {
//     return async function (dispatch:Function, getState:object){
//         // const response = await sendNetworkRequest(itemsPerPage);
//         try{
//             const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
//             dispatch({
//                     type: 'VISIT_SELECTED_USER',
//                     payload:{
//                         userData: response1,
//                     },
//             });
//         }catch(err){
//             console.log(`errorCatch<==>visitSelectedUser/actionCreators`, err);
//             dispatch({
//                 type: 'VISIT_SELECTED_USER',
//                 payload:{
//                     userData: `Error occured`,
//                 }
//             });
//         }
//     }
// };
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
                    type: 'LIKE_THE_PHOTO',
                    payload:{
                        imgMetaDataXL: response1,
                    },
            });
        }catch(err){
            console.log(`visitSelectedUser/actionCreators`, err, `(if its err401, the access token is invalid.)`);
        }
    }
};
export const myProfileActionCreator = (username:string = '2renkov') => { 
    return async function (dispatch:Function, getState:object){
        const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
        console.log(`myProfileActionCreator/ActionCreator`, response1)
        const myProfileMetaData:TempObj = cleanedResponseforMyProfile(response1);
        dispatch({
                type: 'LOGGED_IN_PROFILE',
                payload:{
                    myProfileMetaData: myProfileMetaData,
                },
        })
    }
};
export const myImagesListActionCreator = (username:string, params:ParamsPortfolioImages) => {
    const { pageno, per_page } = params;
    return async function (dispatch:Function, getState:object){
        const response1:any = await sendNetworkRequest(`/users/${username}/photos`, { 
            username: username, 
            page: pageno,
            per_page: per_page,
        });
        // console.log(`myImagesListActionCreator/ActionCreator`, response1.data);
        dispatch({
                type: 'LOGGED_IN_PROFILE_PORTFOLIO',
                payload:{
                    myProfileImagesMetaData: response1.data,
                },
        })
    }
};
export const clearmyPortfolioActionCreator = () => {
    return {
        type: 'CLEAR_MY_PORTFOLIO',
        payload: {},
    }
}

const cleanedResponseforMyProfile = (response:any):TempObj => {
    const { bio, followers_count, following_count, username, total_photos, name, profile_image } = response.data;
    let tempObj:TempObj = {
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
const cleanedResponseforNewsFeed = (response:any):Array<ImgMetaData> => {
    let imagesObj:any = response.data;
    let tempImgList:Array<ImgMetaData> = imagesObj.map( (imageObj:any) => {
        let image:ImgMetaData = {
            url: ``,
            caption: ``,
            likes: 0,
            id: ``,
            likedByUser: true,
            location: ``,
            user:{},
        };
        bind(image, imageObj);
        return image;
    } );
    return tempImgList;
}
const sendNetworkRequest = async (URI:string, params:Object):Promise<any> => {
    // Q: How to change below any in `response:any` to particular type?
    let response:any = await axios.get(`https://api.unsplash.com${URI}`, {
        params: params,
        headers: {
                Authorization: 'Client-ID 5TN16pc1ZRFpinyndwixG65CXhFW0rcYutEP6l9jdIw'
            }
    });
    return response;
};
const bind = (image:ImgMetaData, imagesObj:any) => {
    image.url = imagesObj.urls.regular;
    image.caption = imagesObj.description;
    image.likes = imagesObj.likes;
    image.id = imagesObj.id;
    image.likedByUser = imagesObj.liked_by_user;
    image.location = imagesObj.location.name;
    image.user = imagesObj.user;
}
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
type TempObj = {
    growwgramId: string,
    name: string,
    bio: string,
    followers: number,
    following: number,
    total_photos: number,
    pfpURL: string,
};
type ParamsPortfolioImages = {
    pageno: number;
    per_page: number;
};