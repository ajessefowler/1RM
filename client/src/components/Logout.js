import React, { useState, useRef, Component } from 'react';
import AuthService from '../services/auth';
import { withRouter } from 'react-router-dom';

class Logout extends Component {

    handleClick = (e) => {
        e.preventDefault();
        AuthService.logout();
        this.props.history.push('/');
        window.location.reload();
    }

    render() {
        return (
            <div className="logOut">
                <button className="headerBtn" onClick={this.handleClick}>
                    Log Out
                </button>
            </div>
        )
    }
}

export default withRouter(Logout);