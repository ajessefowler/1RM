import React, { useState, useEffect } from "react";
import AuthService from '../services/auth';

// Change password
// Delete account
// Change units (lbs or kgs)

const Account = (props) => {
    const [confirmDeletion, setConfirmDeletion] = useState(false);

    const handleClose = (event) => {
        props.setAccountIsOpen(false);
    };

    const handleDeleteAccount = (event) => {
        if (!confirmDeletion) setConfirmDeletion(true);
        else {
            // Call API to delete account and log out
            AuthService.logout();
            window.location.reload();
        }
    }

    const handleUnitChange = (event) => {

    }

    return (
        <div className="accountPanel">
            <div className="accountContent">
                <div className="accountBackground" onClick={handleClose}></div>
                <div className="accountHeader">
                    <h2>My Account</h2>
                    <p className="closeAccountPanel" onClick={handleClose}>X</p>
                </div>
                <div className="accountItem">
                    <p className="accountLabel">Change Password</p>
                    <div className="accountForm">
                        <div className="formItem">
                            <p>Current Password</p>
                            <input type="password"></input>
                        </div>
                        <div className="formItem">
                            <p>New Password</p>
                            <input type="password"></input>
                        </div>
                        <div className="formItem">
                            <p>Confirm New Password</p>
                            <input type="password"></input>
                        </div>
                        <input className="submitBtn" type="submit" value="Submit" />
                    </div>
                </div>
                <div className="accountItem">
                    <p className="accountLabel">Change Units</p>
                </div>
                <div className="accountItem">
                    <p className="accountLabel">Delete Account</p>
                    <div className="accountForm">
                        {confirmDeletion ? <p>Are you sure? This cannot be undone.</p> : null }
                        <button className="deleteBtn" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;