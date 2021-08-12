import React, { useState } from "react";

const Delete = (props) => {
    // Close the modify panel when close button is clicked
    const closeDelete = (event) => {
        props.setModifyIsOpen(false);
    }

    return (
        <div className="deleteConfirm">
            <p>Are you sure you want to delete this lift?</p>
            <button>Delete</button>
            <button>Cancel</button>
        </div>
    );
}

export default Delete;