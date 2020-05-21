import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Job from './components/Job';
import { v4 as uuid } from 'uuid';

function App() {
	let initialJobs = [
		{
			id: uuid(),
			company: 'Pathrise',
			title: 'Web Developer',
		},
		{
			id: uuid(),
			company: 'Airbnb',
			title: 'Web Developer',
		},
		{
			id: uuid(),
			company: 'Google',
			title: 'Software Engineer',
		},
		{
			id: uuid(),
			company: 'Facebook',
			title: 'Web Developer',
		},
	];

	const [jobs, setJobs] = useState(initialJobs);

	function onClickDelete(id) {
		let newJobs = jobs.filter((state) => state.id != id);

		setJobs(newJobs);
	}

	function onClickAdd(companyInput, titleInput) {
		let newJob = {
			id: uuid(),
			company: companyInput,
			title: titleInput,
		};

		setJobs([...jobs, newJob]);
	}

	return (
		<div className='App container'>
			<div>
				<Header className='col-6' jobs={jobs} onClickAdd={onClickAdd} />
				<div className='all-jobs'>
					{jobs.map((job) => (
						<Job key={job.id} job={job} onClickDelete={onClickDelete} />
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
