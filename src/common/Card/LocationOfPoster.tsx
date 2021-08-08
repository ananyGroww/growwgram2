import React from 'react';

interface Props{
    location: string;
};
export default class LocationOfPoster extends React.Component<Props>{
    render(){
        return(
            <div>
                {this.props.location}
            </div>
        );
    }
}