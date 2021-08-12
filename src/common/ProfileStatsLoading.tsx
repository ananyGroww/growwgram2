import React from 'react';

import ContentLoader from 'react-content-loader';

export default class ProfileStatsLoading extends React.Component{
    render(){
        return(
            <ContentLoader 
                speed={3}
                width={565}
                height={105}
                viewBox="0 0 565 105"
                backgroundColor="#ffff00"
                foregroundColor="#8669ec"
            >
                <circle cx="51" cy="52" r="50" /> 
                <rect x="143" y="26" rx="0" ry="0" width="63" height="17" /> 
                <rect x="141" y="59" rx="0" ry="0" width="67" height="9" /> 
                <rect x="290" y="59" rx="0" ry="0" width="53" height="9" /> 
                <rect x="219" y="59" rx="0" ry="0" width="57" height="9" /> 
                <rect x="140" y="77" rx="0" ry="0" width="425" height="11" />
            </ContentLoader>
        );
    };
}