import './MyProfile.css';
import './ProfilePageCard.css';
import './ProfilePage.css';

import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';

import {
  clearmyPortfolioActionCreator,
  myImagesListActionCreator,
  myProfileActionCreator,
} from '../../actions';
import MyProfile from './MyProfile';
import ProfileCardLoading from './ProfileCardLoading';
import ProfilePageCard from './ProfilePageCard';

class ProfilePage extends React.Component<Props, State>{
    render(){
        const { myProfileMetaData, myPortfolio } = this.props;
        return(
            <div className='profile0133src'>
                <MyProfile myProfileMetaData={myProfileMetaData}/>
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
                        {myPortfolio.length === 0 ?
                            <ProfileCardLoading/> :
                            this.renderPortfolioImagesWithDetails()
                        }
                    </InfiniteScroll>
                </div>
            </div>
        )
    };
    renderPortfolioImagesWithDetails(){
        const { myPortfolio } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < myPortfolio.length; i++) {
            cards.push(
                <ProfilePageCard key={myPortfolio[i].id+i} imgMetaData={myPortfolio[i]}/>
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
    myProfileMetaData: myProfileMetaData;
    myPortfolio: Array<any>;
};
type Props = {
    myProfileActionCreator: Function;
    myImagesListActionCreator: Function;
    clearmyPortfolioActionCreator: Function;
    myProfileMetaData: myProfileMetaData;
    myPortfolio: Array<any>;
};
type myProfileMetaData = {
    growwgramId: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    total_photos: number;
    pfpURL: string;
};
type State= {
    pageno: number;
    nameOfMyProfile: string;
}