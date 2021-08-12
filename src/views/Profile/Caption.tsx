import React from 'react';

interface Props {
    caption: string;
};
export default class Caption extends React.Component<Props>{
    render(){
        return(
            <div className='caption0133'>
                {this.props.caption}
            </div>
        );
    }
}