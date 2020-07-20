import React from 'react';

import { LOADING_MESSAGE } from '../../constants/app.constants';
import './Loading.styles.css';

export const Loading = () => {
    return (
        <div className="loading-page">
            <div className ="page-loader animate-flicker">{LOADING_MESSAGE}</div>
        </div>      
    );
}