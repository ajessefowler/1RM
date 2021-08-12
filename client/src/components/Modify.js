import React, { useState } from "react";

const Modify = (props) => {
    const [isModifying, setIsModifying] = useState(false);
    const [date, setDate] = useState(props.date);
    const [e1rm, setE1rm] = useState(props.e1rm);
    const [rep, setRep] = useState(props.reps);
    const [weight, setWeight] = useState(props.weight);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleE1rmChange = (event) => {

    }

    const handleWeightChange = (event) => {

    }

    const handleRepChange = (event) => {

    }

    // Close the modify panel when close button is clicked
    const closeModify = (event) => {
        props.setModifyIsOpen(false);
    }

    const toggleIsModifying = (event) => {
        setIsModifying(!isModifying);
    }

    const updateInstance = (event) => {

    }

    const deleteInstance = (event) => {

    }

    return (
        <div className="panel">
            <div className="formItem">
                <p>Date</p>
                {isModifying ? <input type="text" value={date} onChange={handleDateChange} name="date" /> : 
                               <input type="text" value={date} onChange={handleDateChange} name="date" disabled/>}
            </div>
            <div className="formItem">
                <p>e1RM</p>
                {isModifying ? <input type="text" value={e1rm} onChange={handleE1rmChange} name="e1rm" /> : 
                               <input type="text" value={e1rm} onChange={handleE1rmChange} name="e1rm" disabled/>}
            </div>
            <div className="formItem">
                <p>Weight</p>
                {isModifying ? <input type="text" value={weight} onChange={handleWeightChange} name="weight" /> : 
                               <input type="text" value={weight} onChange={handleWeightChange} name="weight" disabled/>}
            </div>
            <div className="formItem">
                <p>Reps</p>
                {isModifying ? <input type="text" value={rep} onChange={handleRepChange} name="rep" /> : 
                               <input type="text" value={rep} onChange={handleRepChange} name="rep" disabled/>}
            </div>
            <p className="modifyClose" onClick={closeModify}>X</p>
            <button onClick={toggleIsModifying}>Modify</button>
            {isModifying ? <button onClick={updateInstance}>Update</button> : <button onClick={updateInstance} disabled>Update</button>}
        </div>
    );
}

export default Modify;