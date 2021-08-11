import React from "react";
import Login from '../components/LoginV2';
import useToken from '../hooks/useToken';

class OneRepMaxForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weight: '', reps: '', erm: '', message: 'Calculate your e1RM.',
                      selectedLift: null, instance: {}};
    
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleRepsChange = this.handleRepsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleLiftSelect = this.handleLiftSelect.bind(this);
    }

    handleWeightChange(event) {
        this.setState({weight: event.target.value});
    }

    handleRepsChange(event) {
        this.setState({reps: event.target.value});
    }

    handleERMChange(event) {
        this.setState({erm: event.target.value});
    }

    handleSubmit(event) {
        const url = 'http://localhost:3001/api/1rm';
        const input = {weight: this.state.weight, reps: this.state.reps};

        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            this.setState({erm: Math.round(dataJson.erm), message: 'Your e1RM is ' + Math.round(dataJson.erm) + ' lbs.'});
            return dataJson.erm;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    handleLiftSelect(event) {
        if (event.target.value != 'Select a lift') this.setState({selectedLift: event.target.value});
        else this.setState({selectedLift: null});
    }

    handleSave(event) {
        if (this.state.selectedLift != null) {
            const url = 'http://localhost:3001/api/lifts/instances/add';
            const input = {name: this.state.selectedLift, username: localStorage.getItem('username'), weight: this.state.weight, reps: this.state.reps};

            event.preventDefault();

            fetch (url, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
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
                    {/* TODO: Clean this up! */}
                    { this.props.loggedIn
                        ? this.state.erm > 0
                            ? <div>
                                {/* Active save option */}
                                <p className="rmdisplay">{this.state.message}</p>
                                <select onChange={this.handleLiftSelect}>
                                    <option value="Select a lift">Select a lift</option>
                                    {/* Pull all lifts into dropdown */}
                                    {this.props.lifts.map((lift) => <option key={lift.name} value={lift.name}>{lift.name}</option>)}
                                </select>
                                {/*<input type="date"></input>*/}
                                <button onClick={this.handleSave}>
                                    Save
                                </button>
                              </div>
                            : <div>
                                {/* Inactive save option */}
                                <p className="rmdisplay">{this.state.message}</p>
                                <select onSelect={this.handleLiftSelect} disabled>
                                    <option value="Select a lift">Select a lift</option>
                                    {this.props.lifts.map((lift) => <option key={lift.name} value={lift.name}>{lift.name}</option>)}
                                </select>
                                {/*<input type="date" disabled></input>*/}
                                <button onClick={this.handleSave} disabled>
                                    Save
                                </button>
                              </div>
                        : <p className="rmdisplay">{this.state.message}</p>}
                </div>
            </div>
        );
    }
}

export default OneRepMaxForm;