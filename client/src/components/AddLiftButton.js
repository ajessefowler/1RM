import React, { useState } from "react";

const AddButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [liftName, setLiftName] = useState('');

    const handleButtonClick = (event) => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    const handleAddLift = (event) => {
        const url = 'http://localhost:3001/api/lifts/add';
        const input = {name: liftName, username: localStorage.getItem('username')};

        event.preventDefault();

        fetch (url, {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'x-access-token': localStorage.getItem('token')},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            props.setNewLift(dataJson);
            setLiftName('');
            setIsOpen(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleNameChange = (event) => {
        setLiftName(event.target.value);
    }

    return (
        <div className="addData">
        {!isOpen ? <div onClick={handleButtonClick} className="addButton collapsed">
                <h2>Add Lift</h2>
                <div className="addButtonSymbol">
                    <h2>+</h2>
                </div>
              </div>
            : <div className="addButton expanded">
                <h2>Add Lift</h2>
                <form className="rmform addForm noBorder" onSubmit={handleAddLift}>
                    <div className="formItem light">
                        <p>Lift Name</p>
                        <input type="text" value={liftName} onChange={handleNameChange} name="liftName" />
                    </div>
                    <input className="submitBtn addLiftBtn" type="submit" value="Add" />
                </form>
                <div className="closeAddLift">
                    <p onClick={handleButtonClick}>x</p>
                </div>
              </div>}
        </div>
    )
}

export default AddButton;