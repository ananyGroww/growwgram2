import React from 'react';

interface Props {
    caption: string;
};
export default class Caption extends React.Component<Props>{
    render(){
        return(
            <div>
                {this.props.caption}
            </div>
        );
    }
}