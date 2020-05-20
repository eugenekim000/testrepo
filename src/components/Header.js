import React from 'react';

function Header(props) {
	let { jobs } = props;
	console.log(jobs);

	return (
		<div>
			<h1>WISHLIST</h1>
			<h2>{jobs.length} Jobs</h2>
			<button>+</button>
		</div>
	);
}

export default Header;
