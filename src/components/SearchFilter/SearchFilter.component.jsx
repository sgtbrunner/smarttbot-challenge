import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import './SearchFilter.styles.css';

export const SearchFilter = props => {
	return (
			<div className="custom-searchfilter">
				<TextField
					type="search"
					fullWidth={true}
					placeholder="search criptocurrency pairs here..."
					onChange={props.searchChange}
					InputProps={{
						endAdornment: (
						  <InputAdornment>
							<SearchIcon />
						  </InputAdornment>
						)
					  }}
				/>
			</div>
	);
 }