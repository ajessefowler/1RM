import React, { useState } from "react";

const Delete = (props) => {
    // Close the modify panel when close button is clicked
    const closeDelete = (event) => {
        props.setConfirmIsOpen(false);
    }

    return (
        <div className="deleteConfirm panel">
            <p>Are you sure you want to delete this lift?</p>
            <button>Delete</button>
            <button onClick={closeDelete}>Cancel</button>
        </div>
    );
}

export default Delete;