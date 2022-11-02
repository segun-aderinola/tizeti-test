import React, {useState} from 'react';
// import { useForm } from 'react-hook-form';
import { STUDENTS } from '../studentsList';
import Resident from './Resident';
import Search from './Search';
import Error from './Error';


// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}


function ResidentsList() {

	const [residentList, setResidentList] = useState([]);
	const [errorMessage, setErrorMessage] = useState([]);

	// setErrorMessage(false)
	// const {checkError, formState: { errors } } = useForm;
	// errorMessage.isError = 'error-message';
    const addResident = resident =>{
        if(!resident.studentName || /^\s*$/.test(resident.studentName)){
            return;
        }

		
		
		let studentIndex;
		let stdValidy = [];
		for(let index = 0; index < STUDENTS.length; index++){
			
						
			if(resident.studentName.toLowerCase() === STUDENTS[index].name.toLowerCase()){
							
				studentIndex = index;
				stdValidy = [STUDENTS[index].validityDate, resident.joiningDate];
														
		}
		
		
    };
	

	if(studentIndex === undefined){
		setErrorMessage('Sorry '+resident.studentName +' is not a verified Student')
	}

	else if(resident.studentName.toLowerCase() === STUDENTS[studentIndex].name.toLowerCase() && checkValidity(stdValidy[0], stdValidy[1]) === false){
		
		// console.log(checkValidity(stdValidy[0], stdValidy[1]))
		const newResidents = [resident, ...residentList];

		setResidentList(newResidents);
	}

	
	else{
		setErrorMessage('Sorry, '+resident.studentName+'`s Validity has expired')
	}
	
}


// 	if(checkValidity(resident.joiningDate, STUDENTS[index].validityDate) === false ){
// 		setErrorMessage('Sorry, '+resident.studentName+'`s Validity has expired')
		
// 		break;
// 	}
// 	else{
// 		const newResidents = [resident, ...residentList];

// 		setResidentList(newResidents);
// 		// setErrorMessage('');
// 	}
// }


// else{
	
// 	// console.log('Not found')
// 	setErrorMessage('Sorry '+resident.studentName +' is not a verified Student')
// }

    const completeResident = id =>{
        let updatedResidentList = residentList.map(resident => {
            if(resident.id === id) {
                resident.isComplete = !resident.isComplete;
            }
            return resident;
        });
        setResidentList(updatedResidentList)
    };


	return (
		<div>
			<Search onSubmit = {addResident}/>

			{/* <div data-testid="errorMsg" className={`error-message ${errorMessage ? "alert error mt-20 slide-up-fade-in" : "" }`} >{errorMessage}</div> */}
			
			{errorMessage && (<div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{errorMessage}</div>) }
			
			<div className="font-weight-bold text-center"> Residents List </div>
				<Resident residentList={residentList} completeResident = {completeResident}/>
			</div>
			
			

		
	);
}

export default ResidentsList;
