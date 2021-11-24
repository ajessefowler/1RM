import React, { useState } from "react";

function LiftInstance(props) {
    function formatDate(date) {
        return date.substring(5,10) + '-' + date.substring(0,4);
    }

    return (
        <div>
             <p>Date: {formatDate(props.date)}, e1RM: {props.erm} {localStorage.getItem('units')}, Weight: {props.weight}, Reps: {props.reps}</p>
        </div>
    );           
}

export default LiftInstance;