import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Modify = (props) => {
    // Need to add one day when we parse the date due to unknown higher powers
    const dateParsed = new Date(formatDateString(props.date));
    const dateAdded = dateParsed.setDate(dateParsed.getDate() + 1);

    const [isModifying, setIsModifying] = useState(false);
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(dateAdded);
    const [e1rm, setE1rm] = useState(props.e1rm);
    const [reps, setReps] = useState(props.reps);
    const [weight, setWeight] = useState(props.weight);

    // Date is sent in MM-DD-YYYY and we need YYYY-MM-DD
    function formatDateString(dateString) {
        const splitDate = dateString.split(/[\.\-\/]/);
        const month = splitDate[0];
        const day = splitDate[1];
        const year = splitDate[2];
        return Date.parse(year + '-' + month + '-' + day);
    }

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const handleRepsChange = (event) => {
        setReps(event.target.value);
    }

    // Close the modify panel when close button is clicked
    const closeModify = (event) => {
        props.setModifyIsOpen(false);
    }

    const toggleIsModifying = (event) => {
        setIsModifying(!isModifying);

        // Restore back to original values
        setDate(dateAdded);
        setReps(props.reps);
        setWeight(props.weight);
    }

    const updateInstance = (event) => {
        const input = { id: props.id };

        console.log('lift instance ' + input.id + ' modified');
    }

    const deleteInstance = (event) => {
        const url = 'http://localhost:3001/api/lifts/instances/delete';
        const input = { id: props.id };

        event.preventDefault();

        fetch (url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            console.log('lift instance ' + input.id + ' deleted');
            props.setModifyIsOpen(false);
            props.setDeletedInstance(props.id);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="panel">
            <div className="formItem">
                <p>Date</p>
                {isModifying ? <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} /> :
                    <DatePicker selected={date} disabled onChange={(newDate) => setDate(newDate)} />}
            </div>
            <div className="formItem">
                <p>e1RM: {e1rm}</p>
            </div>
            <div className="formItem">
                <p>Weight</p>
                {isModifying ? <input type="text" value={weight} onChange={handleWeightChange} name="weight" /> :
                    <input type="text" value={weight} onChange={handleWeightChange} name="weight" disabled />}
            </div>
            <div className="formItem">
                <p>Reps</p>
                {isModifying ? <input type="text" value={reps} onChange={handleRepsChange} name="reps" /> :
                    <input type="text" value={reps} onChange={handleRepsChange} name="reps" disabled />}
            </div>
            <p className="modifyClose" onClick={closeModify}>X</p>
            {isModifying ? <button onClick={toggleIsModifying}>Cancel</button> : <button onClick={toggleIsModifying}>Modify</button>}
            {isModifying ? <button onClick={updateInstance}>Save</button> : <button onClick={updateInstance} disabled>Save</button>}
            <button onClick={deleteInstance}>Delete</button>
        </div>
    );
}

export default Modify;