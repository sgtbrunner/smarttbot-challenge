import React from 'react';

import './Loading.styles.css';

export const Loading = (props) => {
    return (
        <div className="loading-page">
            <div className ="page-loader animate-flicker">{props.message}</div>
        </div>      
    );
}