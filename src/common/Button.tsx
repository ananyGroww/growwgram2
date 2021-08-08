import React from 'react';

interface Props{
    text: string;
}
export default class Button extends React.Component<Props>{
    render(){
        return(
            <div>
                [button] {this.props.text}
            </div>
        );
    }
}