import React from 'react';

function Job(props) {
	let { job, onClickDelete } = props;

	return (
		<div className='job-container'>
			<div>
				{job.company}
				{job.title}
				<button onClick={() => onClickDelete(job.id)}>x</button>
			</div>
		</div>
	);
}

export default Job;
