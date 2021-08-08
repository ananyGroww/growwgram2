import React from 'react';

type Props = {
    growwId: string;
    // Q:  Is this the correct way to remove swiggly lines when `onClick` is called when present in its parent (here, `CardTopBanner`)?
    // onClick?: React.MouseEventHandler;
};
export default class NameOfPoster extends React.Component<Props>{
    render(){
        return(
            <div>
                {this.props.growwId}
            </div>
        );
    }
}
