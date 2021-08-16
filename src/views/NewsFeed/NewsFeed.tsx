import '../../styles/NewsFeed/RightSideColumn.css';
import '../../styles/NewsFeed/NewsFeed.css';

import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';

import { getNewPageActionCreator } from '../../store/actions';
import Card from '../../ui/card/Card';
import { ImgMetaData } from '../../utils/constants/actionReducerConstants';
import NewsFeedLoader from './NewsFeedLoader';
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
                        loader={<NewsFeedLoader/>}
                    >
                        { imagesMetaData.length === 0 ?
                            <NewsFeedLoader/> :
                            this.renderCardsList()
                        }
                    </InfiniteScroll>
                </div>
                <RightSideColumn/>
            </div>
        )
    }
    componentDidMount(){
        const {getNewPageActionCreator, imagesMetaData} = this.props;
        
        if(imagesMetaData.length === 0)
        getNewPageActionCreator();
    }
    loadMorePosts = () => {
        console.log(`loadMorePosts/NewsFeed: Hold on. Loading more posts...`);
        this.props.getNewPageActionCreator();
    }
    renderCardsList():Array<JSX.Element>{
        const { imagesMetaData } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < imagesMetaData.length; i++) {
            cards.push(<Card key={imagesMetaData[i].id +i} index={i} imgMetaData={imagesMetaData[i]}/>)
        }
        return cards;
    }
}
const mapStateToProps = (state:ReduxState) => {
    return {imagesMetaData: state.imagesMetaData};
}
export default connect(mapStateToProps, { getNewPageActionCreator: getNewPageActionCreator, })(NewsFeed);

type Props = {
    imagesMetaData: Array<ImgMetaData>;
    getNewPageActionCreator: Function;
}
type ReduxState = {
    imagesMetaData: Array<ImgMetaData>;
    loggedInProfile: string;
    userData: any,
}
type State = {
    imagesList: Array<ImgMetaData>;
}