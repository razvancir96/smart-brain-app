import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className="center white f3">
				<p className="ma0">Hello, {name}, your entries number is:</p>
			</div>
			<div className="center white f1">
				<p className="ma0">{entries}</p>
			</div>
		</div>
	);
}

export default Rank;