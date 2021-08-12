import React from 'react';

import ContentLoader from 'react-content-loader';

export default class NewsFeedLoader extends React.Component{
    render(){
        let arrayOfLoader:Array<JSX.Element> = [];
        for( let i = 0; i < 20 ; i++){
            arrayOfLoader.push(
                <ContentLoader 
                    key={i}
                    speed={3}   
                    width={472.422}
                    height={657}
                    viewBox="0 0 472.422 657"
                    backgroundColor="#a39b8f"
                    foregroundColor="#8669ec"
                >
                    <rect x="1" y="72" rx="0" ry="0" width="480" height="501" /> 
                    <rect x="17" y="622" rx="0" ry="0" width="179" height="16" /> 
                    <circle cx="25" cy="607" r="10" /> 
                    <rect x="36" y="600" rx="0" ry="0" width="33" height="12" /> 
                    <circle cx="96" cy="606" r="10" /> 
                    <circle cx="131" cy="606" r="10" /> 
                    <circle cx="450" cy="606" r="10" /> 
                    <circle cx="37" cy="36" r="21" /> 
                    <rect x="71" y="19" rx="0" ry="0" width="113" height="13" /> 
                    <rect x="72" y="41" rx="0" ry="0" width="113" height="13" />
                </ContentLoader>
            )
        }
        return(
            arrayOfLoader
        );
    };
}