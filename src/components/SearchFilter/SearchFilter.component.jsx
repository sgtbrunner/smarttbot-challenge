import React from 'react';

import './SearchFilter.styles.css';

export const SearchFilter = props => {
	return (
			<div className="custom-searchfilter">
				<input
					className="custom-input"
					type="search" 
					placeholder="search criptocurrency pairs here..."
					onChange={props.searchChange}
				/>
			</div>
	);
 }