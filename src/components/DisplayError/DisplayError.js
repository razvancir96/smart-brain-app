import React from 'react';
import './DisplayError.css';

const DisplayError = ({message}) => {

	return (
		<div className="error-message f5 ma2">
        	{message}
        </div>
	);
}

export default DisplayError;