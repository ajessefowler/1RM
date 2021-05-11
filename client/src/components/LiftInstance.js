import React, { useState } from "react";

function LiftInstance(props) {
    return (
        <div>
             <p>{props.date}, {props.erm}, {props.weight}, {props.reps}</p>
        </div>
    );           
}

export default LiftInstance;