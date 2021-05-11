import React from "react";

class OneRepMaxForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weight: '', reps: '', erm: ''};
    
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleRepsChange = this.handleRepsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const url = 'http://localhost:3001/api/1rm'
        const input = {weight: this.state.weight, reps: this.state.reps}

        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            this.setState({erm: Math.round(dataJson.erm)});
            return dataJson.erm;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <div>
            <h2>Welcome to 1RM</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Weight:
                    <input type="text" value={this.state.weight} onChange={this.handleWeightChange} name="weight" />
                </label>
                <label>
                    Reps:
                    <input type="text" value={this.state.reps} onChange={this.handleRepsChange} name="reps" />
                </label>
                <input type="submit" value="Submit" />
                <p>Your 1RM is {this.state.erm} lbs.</p>
            </form>
            </div>
        );
    }
}

export default OneRepMaxForm;