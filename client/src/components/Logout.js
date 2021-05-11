import React, { useState, useRef, Component } from 'react';
import AuthService from '../services/auth';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

    handleClick = (e) => {
        e.preventDefault();
        AuthService.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    Log Out
                </button>
            </div>
        )
    }
}

export default withRouter(Logout);