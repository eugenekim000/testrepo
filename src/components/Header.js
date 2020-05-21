import React, { useState } from 'react';

function Header(props) {
	let { jobs, onClickAdd } = props;
	const [companyForm, setCompany] = useState('');
	const [titleForm, setTitle] = useState('');
	const [toggleForm, setToggle] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!companyForm || !titleForm) return;
		onClickAdd(companyForm, titleForm);

		setCompany('');
		setTitle('');
	};

	const handleToggle = () => {
		setToggle(!toggleForm);
	};

	return (
		<div className='header'>
			<h2>WISHLIST</h2>
			<h3>{jobs.length} Jobs</h3>
			<button onClick={() => handleToggle()}>+</button>
			{toggleForm ? (
				<form onSubmit={handleSubmit} className='input-form'>
					<label>
						Company Name:
						<input
							type='text'
							value={companyForm}
							onChange={(e) => setCompany(e.target.value)}
						/>
					</label>
					<label>
						Job Title:
						<input
							type='text'
							value={titleForm}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<input type='submit' value='Submit' />
				</form>
			) : null}
		</div>
	);
}

export default Header;
