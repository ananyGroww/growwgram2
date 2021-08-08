import React from 'react';

import { connect } from 'react-redux';

import { getNewPage } from '../actions';
import Card from '../ui/Card';

class NewsFeed extends React.Component<Props, ClassState>{
    componentDidMount(){
        if(this.props.imagesMetaData.length === 0)
            this.props.getNewPage();
    }
    renderCardsList():Array<JSX.Element>{
        console.log(`renderCardsHelper/NewsFeed`,this.props.imagesMetaData);
        return this.props.imagesMetaData.map( (image:ImgMetaData) => <Card key={image.id} imgMetaData={image}/> );
    }
    render(){
        console.log(`render/NewsFeed`,this.props);
        return(
            <div>
                {this.renderCardsList()}
            </div>
        )
    }
}
const mapStateToProps = (state:ReduxState) => {
    console.log(`mapStateToProps/NewsFeed.tsx`, state);
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