import React, { useState } from "react";

const Delete = (props) => {
    // Close the modify panel when close button is clicked
    const closeDelete = (event) => {
        props.setConfirmIsOpen(false);
    }

    const confirmDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = { name: props.name, username: localStorage.getItem('username') };

        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                props.setRemovedLift(props.name);
                console.log(props.name + ' deleted');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="deleteConfirm panel">
            <p>Are you sure you want to delete this lift?</p>
            <button onClick={confirmDelete}>Delete</button>
            <button onClick={closeDelete}>Cancel</button>
        </div>
    );
}

export default Delete;