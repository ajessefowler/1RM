import React, { useState } from "react";

const Delete = (props) => {
    const id = props.id;
    const [deleteInitiated, setDeleteInitiated] = useState(false);
    const [newName, setNewName] = useState(props.name);

    // Close the modify panel when close button is clicked
    const closeDelete = (event) => {
        props.setModifyIsOpen(false);
    }

    const confirmDelete = (event) => {
        setDeleteInitiated(true);
    }

    const handleInput = (event) => {
        setNewName(event.target.value);
    }

    const handleModification = (event) => {
        const url = 'http://localhost:3001/api/lifts/modify';
        const input = { id: id, newName: newName };

        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                props.setModifiedLift(dataJson);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const submitDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = { name: props.name, username: localStorage.getItem('username') };

        props.setModifyIsOpen(false);

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                props.setRemovedLift(props.name);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="deleteConfirm panel">
            <h2 className="editHeader"><strong>Edit Lift</strong></h2>
            <form className="rmform addForm noBorder" onSubmit={handleModification}>
                <div className="formItem">
                    <p><strong>Lift Name</strong></p>
                    <input type="text" value={newName} onChange={handleInput} name="newName" />
                </div>
                {newName == props.name ? <input disabled className="submitBtn" type="submit" value="Change Name" /> :
                    <input className="submitBtn" type="submit" value="Change Name" />}
            </form>
            <div className="modifyButtons">
                {deleteInitiated ? <button onClick={submitDelete} className="deleteBtn">Delete</button> :
                    <button onClick={confirmDelete} className="deleteBtn">Delete</button>}
                {deleteInitiated ? <p><strong>Click again to delete this lift.</strong></p> : null}
                <button onClick={closeDelete}>Cancel</button>
            </div>
        </div>
    );
}

export default Delete;