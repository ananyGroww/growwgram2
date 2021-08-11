import React from 'react';

import { connect } from 'react-redux';

import { getNewPage } from '../actions';
import Card from '../ui/Card';

class NewsFeed extends React.Component<Props, ClassState>{
    componentDidMount(){
        // Destructuring
        const {getNewPage, imagesMetaData} = this.props;

        if(imagesMetaData.length === 0)
            getNewPage();
    }

    loadMorePosts = () => {
        console.log(`Was this called? loadMorePosts/NewsFeed`);
        this.props.getNewPage();
    }
    renderCardsList():Array<JSX.Element>{
        const { imagesMetaData } = this.props;
        let cards:Array<JSX.Element> = [];
        for(let i = 0; i < imagesMetaData.length; i++) {
            cards.push(<Card key={imagesMetaData[i].id} index={i}/>)
        }
        return cards;
        // return this.props.imagesMetaData.map( (image:ImgMetaData) => <Card key={image.id} imgMetaData={image}/> );
    }
    render(){
        // console.log(`render/NewsFeed`,this.props);
        return(
            <div className='mainPage0133src'>
                <div className='newsFeed0133src'>
                    {this.renderCardsList()}
                </div>
                {/* <div className='newsFeed0133src'>
                    <InfiniteScroll 
                        dataLength={10} 
                        next={this.loadMorePosts} 
                        hasMore={true} 
                        loader={
                            <div style={{fontSize:"xx-small"}}>
                                Please wait while GrowwGram to load more images.
                            </div>
                        }
                    >
                        {this.renderCardsList()}
                    </InfiniteScroll>
                </div> */}
                <div className='myProfilePreview0133src'>
                    Right Side column
                </div>
            </div>
        )
    }
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
type ClassState = {
    imagesList: Array<ImgMetaData>;
}