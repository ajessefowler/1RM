import React, { useState } from "react";

const Delete = (props) => {
    // Close the modify panel when close button is clicked
    const closeDelete = (event) => {
        props.setModifyIsOpen(false);
    }

    return (
        <div className="panel">
            <p>{props.date}</p>
            <p>{props.e1rm} lbs</p>
            <p>{props.weight} lbs</p>
            <p>{props.reps} reps</p>
            <p className="modifyClose" onClick={closeModify}>X</p>
        </div>
    );
}

export default Delete;