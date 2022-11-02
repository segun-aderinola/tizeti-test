import React, { useState } from 'react';
import { STUDENTS } from '../studentsList';



function Search(props) {

	const [studentName, setStudentName] = useState('');
    const [joiningDate, setJoiningDate] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault()
		
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            studentName: studentName,
			joiningDate: joiningDate
        });


    setStudentName('');
    setJoiningDate('');
		
    }



	return (
		<form className='name-form' onSubmit={handleSubmit}>
			<div className="my-50 layout-row align-items-end justify-content-end">
				<label htmlFor="studentName">Student Name:
					<div>
						<input id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10" name = 'studentName' value = {studentName} required onChange={event => setStudentName(event.target.value)} />
					</div>
				</label>
				<label htmlFor="joiningDate">Joining Date:
					<div>
						<input id="joiningDate" data-testid="joiningDate" type="date" className="mr-30 mt-10" name = 'joiningDate' value= {joiningDate} required onChange={event => setJoiningDate(event.target.value)} />
					</div>
				</label>
				<button className="small mb-0">Add</button>
			</div>
		</form>
	);
}

export default Search;
