import React from 'react';

export const SearchFilter = props => {
	return (
			<div>
				<input
					type="search" 
					placeholder="busque aqui a criptomoeda"
					onChange={props.searchChange}
				/>
			</div>
	);
 }