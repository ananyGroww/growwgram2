import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';

import { getNewPage } from '../actions';
import NewsFeedLoader from '../common/NewsFeedLoader';
import Card from '../ui/Card';
import RightSideColumn from './RightSideColumn';

class NewsFeed extends React.Component<Props, State>{
    render(){
        const { imagesMetaData } = this.props;
        return(
            <div className='mainPage0133src'>
                <div className='newsFeed0133mainPage'>
                    <InfiniteScroll 
                        dataLength={imagesMetaData.length} 
                        next={this.loadMorePosts} 
                        hasMore={true} 
                        loader={
                            <div style={{fontSize:"xx-small"}}>
                                Please wait while GrowwGram to load more images.
                            </div>
                        }
                    >
                        { imagesMetaData.length === 0 ?
                            <NewsFeedLoader/> :
                            this.renderCardsList()
                        }
                        {/* {this.renderCardsList()} */}
                    </InfiniteScroll>
                </div>
                <RightSideColumn/>
            </div>
        )
    }
    renderCardsList():Array<JSX.Element>{
        const { imagesMetaData } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < imagesMetaData.length; i++) {
            cards.push(<Card key={imagesMetaData[i].id} index={i} imgMetaData={imagesMetaData[i]}/>)
        }
        return cards;
    }
    componentDidMount(){
        const {getNewPage, imagesMetaData} = this.props;

        if(imagesMetaData.length === 0)
            getNewPage();
    }
    loadMorePosts = () => {
        console.log(`loadMorePosts/NewsFeed: Was 'loadMorePosts()' called?`);
        this.props.getNewPage();
    };
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { getNewPage: getNewPage, })(NewsFeed);

type Props = {
    imagesMetaData: Array<ImgMetaData>;
    getNewPage: Function;
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
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    loggedInProfile: string;
    userData: any,
};
type State = {
    imagesList: Array<ImgMetaData>;
}