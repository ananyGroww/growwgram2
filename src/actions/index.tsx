import axios from 'axios';

// Action Creator
// Q: How to define types of functions `getNewPage` & the `async function` 3 lines below?

// define actions with []action
export const getNewPage = (itemsPerPage:number = 10) => {
    // return an action
    return async function (dispatch:Function, getState:object){
        // const response = await sendNetworkRequest(itemsPerPage);
        const response1:any = await sendNetworkRequest(`/photos/random`, { query: 'party', count: itemsPerPage });
        // console.log(`render/action`, response, response instanceof Array);
        let imgObjList = cleanedResponse(response1);
        dispatch({
                type: 'GET_NEW_PAGE',
                payload:{
                    imagesObjList: imgObjList,
                }
        }); 
    }
};
export const getPage = (itemsPerPage:number = 10) => {
    // return an action
    return async function (dispatch:Function, getState:object){
        // const response = await sendNetworkRequest(itemsPerPage);
        const response1:any = await sendNetworkRequest(`/photos/random`, { query: 'party', count: itemsPerPage });
        // console.log(`render/action`, response, response instanceof Array);
        let imgObjList = cleanedResponse(response1);
        dispatch({
                type: 'GET_NEW_PAGE',
                payload:{
                    imagesObjList: imgObjList,
                }
        }); 
    }
};

export const userImagesActionCreator = (username:string = '2renkov') => {
    // return an action
    return async function (dispatch:Function, getState:object){
        const response1:any = await sendNetworkRequest(`/users/${username}/photos`, { username: username,});
        console.log( `userImagesActionCreator/action`, response1 );
        let userImagesURLList:Array<string> = response1.data.map( (imgObj:any) => imgObj.urls.regular );
        console.log( `After:userImagesActionCreator/action`, userImagesURLList );
        dispatch({
                type: 'USER_IMAGES_LIST',
                payload:{
                    userImagesURLList: userImagesURLList,
                }
        }); 
    }
};
export const visitSelectedUserActionCreator = (index:number = 1, username:string = '2renkov') => {
    return async function (dispatch:Function, getState:object){
        // const response = await sendNetworkRequest(itemsPerPage);
        try{
            const response1:any = await sendNetworkRequest(`/users/${username}`, { username: username,});
            // console.log(`visitSelectedUser/action`, response1);
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
    // return {
    //     type: 'SELCTED_USER',
    //     payload:{
    //     userData: response1,
    //     },
    // };
};
export const likePressActionCreator = (index:number = 0) => {
    console.log(`likePressActionCreator/action.. handling Like press...`)
    return {
        type: 'CHANGE_LIKE_VALUE',
        payload : {
            index: index,
        }
    }
}


// THIS FUNCTION IS INCOMPLETE
export const loggedInProfile = (userName:string = '2renkov') => {
    // comment the part below this comment and call axios above this comment.
    return {
        type: 'LOGGED_IN_PROFILE',
        payload: {
            userName: userName,
        },
    };
};
// export const getUserProfile = ( userName:string) => {
//     return async function (dispatch:Function, getState:object){
//         // const response = await sendNetworkRequest(itemsPerPage);
//         const response1:any = await sendNetworkRequest(0, `/users/:username`, { username: userName });
//         // console.log(`getUserProfile/action`, response, response instanceof Array);
//         dispatch({
//                 type: 'GET_USER_PROFILE',
//                 payload:{
//                     userData: response1,
//                 }
//         }); 
//     }
// }

const cleanedResponse = (response:any):Array<ImgMetaData> => {
    let imagesObj:any = response.data;
    console.log(`sendNetworkRequest/actionCreators `, imagesObj);
    let tempImgList:Array<ImgMetaData> = imagesObj.map( (imageObj:any) => {
        // let image:ImgMetaData = imageObj;
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
    // A: You don't, for now. Groww does it though.

    // Q: How do I add error handling? (Here, suppose net rqst fails. So this Promise should return `reject();`)
    let response:any = await axios.get(`https://api.unsplash.com${URI}`, {
        params: params,
        headers: {
                Authorization: 'Client-ID B0lyINmsrENvvv75E_HItGpAp7vHXschObEogo542tY'
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
};
type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};