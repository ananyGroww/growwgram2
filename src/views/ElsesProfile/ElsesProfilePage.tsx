import '../../styles/Profile/MyProfile.css';
import '../../styles/Profile/ProfilePageCard.css';
import '../../styles/Profile/ProfilePage.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import {
  visitUserImagesListActionCreator,
  visitUserProfileActionCreator,
} from '../../store/actions';
import ProfilePageCard from '../../ui/profileCard/ProfilePageCard';
import {
  myProfileMetaData,
} from '../../utils/constants/actionReducerConstants';
// import { MY_PROFILE } from '../../utils/constants/growwgramConstants';
// import MyProfile from './AboutMe';
import MyProfile from '../Profile/AboutMe';
// import ProfileCardLoading from './ProfileCardLoading';
import ProfileCardLoading from '../Profile/ProfileCardLoading';

class ProfilePage extends React.Component<Props, State>{
    render(){
        // const { myProfileMetaData, myPortfolio } = this.props;
        const { visitUserProfileMetaData, visitUserPortfolio } = this.props;
        return(
            <div className='profile0133src'>
                <MyProfile myProfileMetaData={visitUserProfileMetaData}/>
                <div>
                    <InfiniteScroll 
                        className='portfolio0133profile'
                        dataLength={visitUserPortfolio.length} 
                        next={this.loadMorePosts} 
                        hasMore={true} 
                        loader={
                            <ProfileCardLoading/>
                        }
                    >
                        {visitUserPortfolio.length === 0 ?
                            <ProfileCardLoading/> :
                            this.renderPortfolioImagesWithDetails()
                        }
                    </InfiniteScroll>
                </div>
            </div>
        )
    };
    renderPortfolioImagesWithDetails(){
        const { visitUserPortfolio } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < visitUserPortfolio.length; i++) {
            cards.push(
                <ProfilePageCard key={visitUserPortfolio[i].id+i} imgMetaData={visitUserPortfolio[i]}/>
            );
        }
        return cards;
    };
    // componentDidMount(){
    //     this.getMyProfile();
    // }
    loadMorePosts = () => {
        ( function () {
            toast.error('Could not fetch nore posts. Try again later', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        })();
        // console.log(`was this 'loadMorePosts()' called?`);
        // this.setState({pageno: this.state.pageno+1,});
        // const params = {
        //     pageno: this.state.pageno,
        //     per_page: 20,
        // };
        // // this.props.myImagesListActionCreator(this.state.nameOfMyProfile, params);
        // this.props.visitUserImagesListActionCreator(this.state.nameOfMyProfile, params);
    }
    getMyProfile(){
        const nameOfMyProfile = this.state.nameOfMyProfile;
        // const { myProfileActionCreator, myImagesListActionCreator, myPortfolio, } = this.props;
        const { visitUserProfileActionCreator, visitUserImagesListActionCreator, visitUserPortfolio, } = this.props;
        const notify = () => toast.error(`Could not fetch your profile's data. Please Shift reload`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         visitUserProfileActionCreator(nameOfMyProfile).catch(notify);
        if(visitUserPortfolio.length === 0){
            const params = {
                pageno: this.state.pageno,
                per_page: 20,
            };
            visitUserImagesListActionCreator(nameOfMyProfile, params).catch(notify);
        }
    }
    constructor(props:Props){
        super(props);
        window.scrollTo(0, 0);
        this.state = {
            pageno: 1,
            nameOfMyProfile: this.props.visitUserProfileMetaData.growwgramId,
        }
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {
        // myProfileMetaData: state.myProfileMetaData,
        // myPortfolio: state.myPortfolio,

        visitUserProfileMetaData: state.visitUserProfileMetaData, 
        visitUserPortfolio: state.visitUserPortfolio,
    };
}
export default connect(
    mapStateToProps, {
        // myProfileActionCreator: myProfileActionCreator,
        // myImagesListActionCreator: myImagesListActionCreator,

        visitUserProfileActionCreator: visitUserProfileActionCreator,
        visitUserImagesListActionCreator:visitUserImagesListActionCreator,
    }
)(ProfilePage);
type ReduxState = {
    // myProfileMetaData: myProfileMetaData;
    // myPortfolio: Array<any>;

    visitUserProfileMetaData: myProfileMetaData, 
    visitUserPortfolio: Array<any>,
};
type Props = {
    // myProfileActionCreator: Function;
    // myImagesListActionCreator: Function;
    
    // myProfileMetaData: myProfileMetaData;
    // myPortfolio: Array<any>;

    visitUserProfileActionCreator: Function;
    visitUserImagesListActionCreator: Function;

    visitUserProfileMetaData: myProfileMetaData;
    visitUserPortfolio: Array<any>;
};
type State= {
    pageno: number;
    nameOfMyProfile: string;
}
