export const GET_NEW_PAGE = `GET_NEW_PAGE`;
export const LIKE_THE_PHOTO = `LIKE_THE_PHOTO`;
export const USER_IMAGES_METADATA = `USER_IMAGES_METADATA`;
export const LOGGED_IN_PROFILE = `LOGGED_IN_PROFILE`;

export const VISIT_SELECTED_USER = `VISIT_SELECTED_USER`;
export const LOGGED_IN_PROFILE_PORTFOLIO = `LOGGED_IN_PROFILE_PORTFOLIO`;


export type ImgMetaData = {
    url: string;
    caption: string;
    likes: number;
    id: string;
    likedByUser: boolean;
    location: string;
    user: any;
};
export type TempObj = {
    growwgramId: string,
    name: string,
    bio: string,
    followers: number,
    following: number,
    total_photos: number,
    pfpURL: string,
};
export type ParamsPortfolioImages = {
    pageno: number;
    per_page: number;
};
export type myProfileMetaData = {
    growwgramId: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    total_photos: number;
    pfpURL: string;
};
// If you don't want to initialize obj in argument list line, then add ?. here (In reference to reducers.tsx)
export type visitingUser = {
    name?: string;
    growwgramId?: string;
    bio?: string;
    followers?: number;
    following?: number;
    pfpURL?: string;
    total_photos?: number;
};
export type GET_NEW_PAGE_ACTION = {
    type: string;
    payload:{
        imagesObjList: Array<ImgMetaData>,
    };
};
export type LOGGED_IN_PROFILE_ACTION = {
    type: string;
    payload: {
        username: TempObj,
    };
};
export type USER_DATA_ACTION = {
    type: string;
    payload: any;
};
export type CHANGE_LIKE_VALUE_ACTION = {
    type: string;
    payload: {
        index: number;
    }
}
export type USER_IMAGES_LIST_ACTION = {
    type: string;
    payload: {
        userImagesURLList: Array<string>;
    }
};
export type USER_IMAGES_METADATA_ACTION = {
    type: string;
    payload: {
        userImagesURLList: Array<any>;
    }
};
export type LOGGED_IN_PROFILE_PORTFOLIO_ACTION = {
    type: string;
    payload: {
        myProfileImagesMetaData: Array<any>
    }
};