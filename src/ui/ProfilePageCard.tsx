import React from 'react';

type Props = {
};
type State = {
};
export default class ProfilePageCard extends React.Component<Props, State>{
    // get (list of images, caption, likes), total likes, name, location for user with userId stored in this.props.userData
    render(){
        // console.log(`render./Card `,this.props.imgMetaData.url);
        return(
            <div>
                {/* <CardPrimaryPicture imgMetaData={this.props?.user.}/>
                <CardBottomBanner imgMetaData={this.props.user.}/> */}
                <hr/>
            </div>
        );
    }
}