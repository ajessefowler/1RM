import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import calculate1RM from "../services/repMaxCalc";

import "react-datepicker/dist/react-datepicker.css";

function OneRepMaxForm(props) {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [erm, setErm] = useState('');
    const [message, setMessage] = useState('Calculate your e1RM.');
    const [selectedLift, setSelectedLift] = useState(null);
    const [units, setUnits] = useState({});
    const [date, setDate] = useState(new Date());

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const handleRepsChange = (event) => {
        setReps(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const erm = calculate1RM(weight, reps);
        setErm(Math.round(erm));
        setMessage('Your e1RM is ' + Math.round(erm) + ' ' + units + '.');

        return erm;
    }

    const handleLiftSelect = (event) => {
        if (event.target.value != 'Select a lift') setSelectedLift(event.target.value);
        else setSelectedLift(null);
    }

    const handleSave = (event) => {
        if (selectedLift != null) {
            const url = 'http://localhost:3001/api/lifts/instances/add';
            const input = {
                name: selectedLift, username: localStorage.getItem('username'), weight: weight,
                reps: reps, date: date
            };

            event.preventDefault();

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
                body: JSON.stringify(input)
            })
                .then(response => response.json())
                .then(dataJson => {
                    props.setNewInstance(dataJson);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    useEffect(() => {
        setUnits(props.units);

        if (erm > 0) setMessage('Your e1RM is ' + Math.round(erm) + ' ' + units + '.');
        else setMessage('Calculate your e1RM.');
    }, [props.units, units]);

    return (
        <div className="repmax">
            {localStorage.getItem('username')
                ? <h2></h2>
                : <h2 className="welcomeMsg">e1RM Calculator</h2>}
            <div className="formContainer">
                <form className="rmform" onSubmit={handleSubmit}>
                    <div className="formItem">
                        <p>Weight</p>
                        <input type="text" value={weight} onChange={handleWeightChange} name="weight" />
                    </div>
                    <div className="formItem">
                        <p>Reps</p>
                        <input type="text" value={reps} onChange={handleRepsChange} name="reps" />
                    </div>
                    <input className="submitBtn" type="submit" value="Submit" />
                </form>
                {props.loggedIn
                    ? erm > 0
                        ? <div className="formBottom">
                            {/* Active save option */}
                            <p className="rmdisplay"><strong>{message}</strong></p>
                            <div className="saveForm">
                                <div className="formItem">
                                    <p>Date</p>
                                    <DatePicker selected={date} onChange={(newDate) => setDate(newDate - 1)} />
                                </div>
                                <div className="formItem">
                                    <p>Lift</p>
                                    <select onChange={handleLiftSelect}>
                                        <option value="Select a lift">Select a lift</option>
                                        {/* Pull all lifts into dropdown */}
                                        {props.lifts.map((lift) => <option key={lift.name} value={lift.name}>{lift.name}</option>)}
                                    </select>
                                </div>
                                {/*<input type="date"></input>*/}
                                <button onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        </div>
                        : <div className="formBottom">
                            {/* Inactive save option */}
                            <p className="rmdisplay"><strong>{message}</strong></p>
                        </div>
                    : <p className="rmdisplay"><strong>{message}</strong></p>}
            </div>
        </div>
    );
}

export default OneRepMaxForm;