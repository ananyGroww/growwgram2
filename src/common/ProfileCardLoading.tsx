import React from 'react';

import ContentLoader from 'react-content-loader';

export default class ProfileCardLoading extends React.Component {
    render(){
        let arrayOfLoader:Array<JSX.Element> = [];
        for( let i = 0; i < 20 ; i++){
            arrayOfLoader.push(
                <ContentLoader 
                    key={i}
                    speed={2}
                    width='100%'
                    height='100%'
                    viewBox="0 0 250.719 303"
                    backgroundColor="#f688ce"
                    foregroundColor="#69ecdd"
                >
                    <rect x="-1" y="370" rx="0" ry="0" width="41" height="42" /> 
                    <rect x="58" y="370" rx="0" ry="0" width="42" height="42" /> 
                    <rect x="119" y="370" rx="0" ry="0" width="41" height="42" /> 
                    <rect x="360" y="370" rx="0" ry="0" width="41" height="42" /> 
                    <rect x="-1" y="430" rx="0" ry="0" width="403" height="21" /> 
                    <circle cx="284" cy="341" r="47" /> 
                    <rect x="21" y="271" rx="0" ry="0" width="308" height="42" /> 
                    <circle cx="189" cy="971" r="16" /> 
                    <circle cx="35" cy="249" r="15" /> 
                    <circle cx="73" cy="249" r="15" /> 
                    <circle cx="111" cy="249" r="15" /> 
                    <circle cx="236" cy="249" r="15" /> 
                    <rect x="20" y="10" rx="0" ry="0" width="229" height="216" />
                </ContentLoader>
            )
        }
        return(
            arrayOfLoader
        );
    };
};