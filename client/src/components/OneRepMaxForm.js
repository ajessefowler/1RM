import React from "react";
import Login from '../components/LoginV2';
import useToken from '../hooks/useToken';
import DatePicker from "react-datepicker";
import calculate1RM from "../services/repMaxCalc";

import "react-datepicker/dist/react-datepicker.css";

class OneRepMaxForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: '', reps: '', erm: '', message: 'Calculate your e1RM.',
            selectedLift: null, instance: {}, date: new Date()
        };

        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleRepsChange = this.handleRepsChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleLiftSelect = this.handleLiftSelect.bind(this);
    }

    handleWeightChange(event) {
        this.setState({ weight: event.target.value });
    }

    handleRepsChange(event) {
        this.setState({ reps: event.target.value });
    }

    handleDateChange(event) {
        const date = event.target.value;
        date = date - 1;
        this.setState({ date: date });
    }

    handleERMChange(event) {
        this.setState({ erm: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const erm = calculate1RM(this.state.weight, this.state.reps);
        this.setState({ erm: Math.round(erm), message: 'Your e1RM is ' + Math.round(erm) + ' lbs.' });

        return erm;
    }

    handleLiftSelect(event) {
        if (event.target.value != 'Select a lift') this.setState({ selectedLift: event.target.value });
        else this.setState({ selectedLift: null });
    }

    handleSave(event) {
        if (this.state.selectedLift != null) {
            const url = 'http://localhost:3001/api/lifts/instances/add';
            const input = {
                name: this.state.selectedLift, username: localStorage.getItem('username'), weight: this.state.weight,
                reps: this.state.reps, date: this.state.date
            };

            event.preventDefault();

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            })
                .then(response => response.json())
                .then(dataJson => {
                    this.props.setNewInstance(dataJson);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    render() {
        return (
            <div className="repmax">
                {localStorage.getItem('username')
                    ? <h2></h2>
                    : <h2 className="welcomeMsg">Welcome to e1RM.</h2>}
                <div className="formContainer">
                    <form className="rmform" onSubmit={this.handleSubmit}>
                        <div className="formItem">
                            <p>Weight</p>
                            <input type="text" value={this.state.weight} onChange={this.handleWeightChange} name="weight" />
                        </div>
                        <div className="formItem">
                            <p>Reps</p>
                            <input type="text" value={this.state.reps} onChange={this.handleRepsChange} name="reps" />
                        </div>
                        <input className="submitBtn" type="submit" value="Submit" />
                    </form>
                    {this.props.loggedIn
                        ? this.state.erm > 0
                            ? <div className="formBottom">
                                {/* Active save option */}
                                <p className="rmdisplay"><strong>{this.state.message}</strong></p>
                                <div className="saveForm">
                                    <div className="formItem">
                                        <p>Date</p>
                                        <DatePicker selected={this.state.date} onChange={(newDate) => this.setState({ date: newDate })} />
                                    </div>
                                    <div className="formItem">
                                        <p>Lift</p>
                                        <select onChange={this.handleLiftSelect}>
                                            <option value="Select a lift">Select a lift</option>
                                            {/* Pull all lifts into dropdown */}
                                            {this.props.lifts.map((lift) => <option key={lift.name} value={lift.name}>{lift.name}</option>)}
                                        </select>
                                    </div>
                                    {/*<input type="date"></input>*/}
                                    <button onClick={this.handleSave}>
                                        Save
                                    </button>
                                </div>
                            </div>
                            : <div className="formBottom">
                                {/* Inactive save option */}
                                <p className="rmdisplay"><strong>{this.state.message}</strong></p>
                            </div>
                        : <p className="rmdisplay"><strong>{this.state.message}</strong></p>}
                </div>
            </div>
        );
    }
}

export default OneRepMaxForm;