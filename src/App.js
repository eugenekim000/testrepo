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
			color: 'rgb(255, 111, 97)',
			timeStamp: 'Thu May 21 2020 11:17:20',
		},
		{
			id: uuid(),
			company: 'Airbnb',
			title: 'Web Developer',
			color: 'rgb(69, 184, 172)',
			timeStamp: 'Thu May 21 2020 11:17:20',
		},
		{
			id: uuid(),
			company: 'Google',
			title: 'Software Engineer',
			color: 'rgb(107, 91, 149)',
			timeStamp: 'Thu May 21 2020 11:17:20',
		},
		{
			id: uuid(),
			company: 'Facebook',
			title: 'Web Developer',
			color: 'rgb(146, 168, 209)',
			timeStamp: 'Thu May 21 2020 11:17:20',
		},
	];

	const [jobs, setJobs] = useState(initialJobs);

	function onClickDelete(id) {
		let newJobs = jobs.filter((state) => state.id != id);

		setJobs(newJobs);
	}

	function onClickAdd(companyInput, titleInput) {
		let colors = [
			'rgb(255, 111, 97)',
			'rgb(146, 168, 209)',
			'rgb(107, 91, 149)',
			'rgb(69, 184, 172)',
		];
		let randomColor = colors[Math.floor(Math.random() * colors.length)];
		let time = Date.now();
		let timeString = Date(time).toString().substring(0, 25);

		let newJob = {
			id: uuid(),
			company: companyInput,
			title: titleInput,
			color: randomColor,
			timeStamp: timeString,
		};

		setJobs([...jobs, newJob]);
	}

	return (
		<div className='App container'>
			<div>
				<Header jobs={jobs} onClickAdd={onClickAdd} />
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
