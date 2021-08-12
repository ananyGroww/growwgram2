import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';

import {
  faBookmark,
  faComment,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  clearmyPortfolioActionCreator,
  myImagesListActionCreator,
  myProfileActionCreator,
} from '../actions';
import Caption from '../common/Card/Caption';
import Likes from '../common/Card/Likes';

class ProfilePage extends React.Component<Props, State>{
    render(){
        const { myProfileMetaData, myPortfolio } = this.props;
        const { growwgramId, bio, followers, following, pfpURL, total_photos } = myProfileMetaData;
        return(
            <div className='profile0133src'>
                <div className='userInfo0133profile'>
                    <div className='pfp0133userInfo'>
                        <img className='image' src={pfpURL} alt='Profile'/>
                    </div>
                    <ul className='stats0133userInfo'>
                        <li key={growwgramId} className='growwgramId0133stats fs18'>{growwgramId}</li>
                        <li>
                            <ul className='metric0133stats'>
                                <li key={followers}>Followers {followers?followers:0}</li>
                                <li key={following}>Following {following?following:0}</li>
                                <li key={total_photos}>Posts {total_photos}</li>
                            </ul>
                        </li>
                        <li key={bio}>{bio}</li>
                    </ul>
                </div>
                <div>
                    <InfiniteScroll 
                        className='portfolio0133profile'
                        dataLength={myPortfolio.length} 
                        next={this.loadMorePosts} 
                        hasMore={true} 
                        loader={
                                `Please wait while GrowwGram loads more images.`
                        }
                    >
                        {this.renderPortfolioImagesWithDetails()}
                    </InfiniteScroll>
                </div>
                {/* <div className='pportfolio0133profile'>
                    {this.renderPortfolioImagesWithDetails()}
                </div> */}
            </div>
        )
    };
    renderPortfolioImagesWithDetails(){
        const { myPortfolio } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < myPortfolio.length; i++) {
            const { liked_by_user, alt_description, id, likes, urls,  } = myPortfolio[i];
            cards.push(
                <div key='id'>
                    <img
                        className='image'
                        key={`${id}+img`}
                        src={urls.regular}
                        alt={alt_description}
                    />
                    <div className='imageDetails0133portfolio'>
                        <ul className='list0133CardBottomBanner fs12'>
                            <li key={`${id}+likes`}>
                                <Likes noOfLikes={likes} isLiked={liked_by_user}/>
                            </li>
                            <li key={`${id}+comment}`}>
                                <FontAwesomeIcon icon={faComment} size='lg'/>
                            </li>
                            <li key={`${id}+share`} className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faShareSquare} size='lg'/>
                            </li>
                            <li key={`${id}+bookmark`} className='push0133cardBottomBanner'>
                                <FontAwesomeIcon icon={faBookmark} size='lg'/>
                            </li>
                        </ul>
                        <Caption caption={alt_description}/>
                    </div>
                </div>
            );
        }
        return cards;
    };
    componentDidMount(){
        this.getMyProfile();
    }
    componentWillUnmount(){
        this.props.clearmyPortfolioActionCreator();
    }
    loadMorePosts = () => {
        console.log(`was this 'loadMorePosts()' called?`);
        this.setState({pageno: this.state.pageno+1,});
        const params = {
            pageno: this.state.pageno,
            per_page: 20,
        };
        this.props.myImagesListActionCreator(this.state.nameOfMyProfile, params);
    }
    getMyProfile(){
        const nameOfMyProfile = this.state.nameOfMyProfile;
        const { myProfileActionCreator, myImagesListActionCreator, myPortfolio } = this.props;
        myProfileActionCreator(nameOfMyProfile);
        if(myPortfolio.length === 0){
            const params = {
                pageno: this.state.pageno,
                per_page: 20,
            };
            myImagesListActionCreator(nameOfMyProfile, params);
        }
    }
    constructor(props:Props){
        super(props);
        this.state = {
            pageno: 1,
            nameOfMyProfile: `laukev`,
        }
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {
        myProfileMetaData: state.myProfileMetaData,
        myPortfolio: state.myPortfolio,
    };
}
export default connect(
    mapStateToProps, {
        myProfileActionCreator: myProfileActionCreator,
        myImagesListActionCreator: myImagesListActionCreator,
        clearmyPortfolioActionCreator: clearmyPortfolioActionCreator,
    }
)(ProfilePage);
type ReduxState = {
    myProfileMetaData: TempObj;
    myPortfolio: Array<any>;
};
type Props = {
    myProfileActionCreator: Function;
    myImagesListActionCreator: Function;
    clearmyPortfolioActionCreator: Function;
    myProfileMetaData: TempObj;
    myPortfolio: Array<any>;
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
type State= {
    pageno: number;
    nameOfMyProfile: string;
}