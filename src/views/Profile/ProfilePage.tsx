import '../../styles/Profile/MyProfile.css';
import '../../styles/Profile/ProfilePageCard.css';
import '../../styles/Profile/ProfilePage.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  myImagesListActionCreator,
  myProfileActionCreator,
} from '../../store/actions';
import ProfilePageCard from '../../ui/profileCard/ProfilePageCard';
import {
  myProfileMetaData,
} from '../../utils/constants/actionReducerConstants';
import { MY_PROFILE } from '../../utils/constants/growwgramConstants';
import MyProfile from './AboutMe';
import ProfileCardLoading from './ProfileCardLoading';

const ProfilePage = (props:Props) => {
    const myProfileMetaData = useSelector( (state:ReduxState) => state.myProfileMetaData );
    const myPortfolio = useSelector( (state:ReduxState) => state.myPortfolio );
    const dispatch:ThunkDispatch<ReduxState, any, AnyAction> = useDispatch();

    const [ nameOfMyProfile, ] = useState(MY_PROFILE);
    const [ pageno, setpageno ] = useState(1);

    const renderPortfolioImagesWithDetails = () => {
        let cards:Array<JSX.Element> = [];

        for(let i = 0; i < myPortfolio.length; i++) {
            cards.push(
                <ProfilePageCard 
                    key={myPortfolio[i].id+i} 
                    imgMetaData={myPortfolio[i]}
                />
            );
        }

        return cards;
    };

    useEffect( ()=>{
        const getMyProfile = () => {
            const duration = 5000; // seconds
            dispatch(myProfileActionCreator(nameOfMyProfile)).catch(()=>notify(duration));
    
            if(myPortfolio.length === 0){
                const params = {
                    pageno: pageno,
                    per_page: 20,
                };
                dispatch(myImagesListActionCreator(nameOfMyProfile, params)).catch(()=>notify(duration));
            }
        };
        getMyProfile();
    },[
        dispatch, 
        myPortfolio, 
        nameOfMyProfile, 
        pageno
    ]);

    const loadMorePosts = () => {
        console.log(`Request for more posts made.`);

        const params = {
            pageno: pageno,
            per_page: 20,
        };
        const duration = 5000; // seconds
        dispatch(myImagesListActionCreator(nameOfMyProfile, params)).catch(() => notify(duration));

        setpageno( pagenumber => pagenumber+1);
    };

    

    return(
        <div className='profile0133src'>
            <MyProfile myProfileMetaData={myProfileMetaData}/>
            <div>
                <InfiniteScroll 
                    className='portfolio0133profile'
                    dataLength={myPortfolio.length} 
                    next={loadMorePosts} 
                    hasMore={true} 
                    loader={
                        <ProfileCardLoading/>
                    }
                >
                    {
                        myPortfolio.length === 0 
                        ? <ProfileCardLoading/>
                        : renderPortfolioImagesWithDetails()
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};

const notify = (duration:number) => toast.error(`Could not your profile's data. Please Shift reload`, {
    position: "bottom-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export default ProfilePage;

// class ProfilePage extends React.Component<Props, State>{
//     render(){
//         const { myProfileMetaData, myPortfolio } = this.props;
//         return(
//             <div className='profile0133src'>
//                 <MyProfile myProfileMetaData={myProfileMetaData}/>
//                 <div>
//                     <InfiniteScroll 
//                         className='portfolio0133profile'
//                         dataLength={myPortfolio.length} 
//                         next={this.loadMorePosts} 
//                         hasMore={true} 
//                         loader={
//                             <ProfileCardLoading/>
//                         }
//                     >
//                         {myPortfolio.length === 0 ?
//                             <ProfileCardLoading/> :
//                             this.renderPortfolioImagesWithDetails()
//                         }
//                     </InfiniteScroll>
//                 </div>
//             </div>
//         )
//     };
//     renderPortfolioImagesWithDetails(){
//         const { myPortfolio } = this.props;
//         let cards:Array<JSX.Element> = [];
//         for(let i = 0; i < myPortfolio.length; i++) {
//             cards.push(
//                 <ProfilePageCard key={myPortfolio[i].id+i} imgMetaData={myPortfolio[i]}/>
//             );
//         }
//         return cards;
//     };
//     componentDidMount(){
//         this.getMyProfile();
//     }
//     loadMorePosts = () => {
//         console.log(`was this 'loadMorePosts()' called?`);
//         this.setState({pageno: this.state.pageno+1,});
//         const params = {
//             pageno: this.state.pageno,
//             per_page: 20,
//         };
//         this.props.myImagesListActionCreator(this.state.nameOfMyProfile, params);
//     }
//     getMyProfile(){
//         const nameOfMyProfile = this.state.nameOfMyProfile;
//         const { myProfileActionCreator, myImagesListActionCreator, myPortfolio, } = this.props;
//         const notify = () => toast.error(`Could not your profile's data. Please Shift reload`, {
//             position: "bottom-center",
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//          });
//         myProfileActionCreator(nameOfMyProfile).catch(notify);
//         if(myPortfolio.length === 0){
//             const params = {
//                 pageno: this.state.pageno,
//                 per_page: 20,
//             };
//             myImagesListActionCreator(nameOfMyProfile, params).catch(notify);
//         }
//     }
//     constructor(props:Props){
//         super(props);
//         window.scrollTo(0, 0);
//         this.state = {
//             pageno: 1,
//             nameOfMyProfile: MY_PROFILE,
//         }
//     }
// }
// const mapStateToProps = (state:ReduxState) => {
//     return {
//         myProfileMetaData: state.myProfileMetaData,
//         myPortfolio: state.myPortfolio,
//     };
// }
// export default connect(
//     mapStateToProps, {
//         myProfileActionCreator: myProfileActionCreator,
//         myImagesListActionCreator: myImagesListActionCreator,
//     }
// )(ProfilePage);
type ReduxState = {
    myProfileMetaData: myProfileMetaData;
    myPortfolio: Array<any>;
};
type Props = {
    myProfileActionCreator: Function;
    myImagesListActionCreator: Function;
    
    myProfileMetaData: myProfileMetaData;
    myPortfolio: Array<any>;
};
// type State= {
//     pageno: number;
//     nameOfMyProfile: string;
// }