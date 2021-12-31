import React, { useState, useEffect } from "react";
import AuthService from '../services/auth';
import UnitToggle from '../components/UnitToggle';
import ChangePasswordForm from "./ChangePasswordForm";

const Account = (props) => {
    const [confirmDeletion, setConfirmDeletion] = useState(false);

    const handleClose = (event) => {
        props.setAccountIsOpen(false);
    };

    const handleDeleteAccount = (event) => {
        const url = 'http://localhost:3001/api/users/' + localStorage.getItem('userId') + '/delete';

        if (!confirmDeletion) setConfirmDeletion(true);
        else {
            AuthService.logout();
            window.location.reload();

            fetch(url, {
                method: 'DELETE',
                headers: { 'x-access-token': localStorage.getItem('token') }
            })
                .then(response => response.json())
                .then(dataJson => {
                    console.log('account deleted');
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    const handleUnitChange = (event) => {
        const url = 'http://localhost:3001/api/users/' + localStorage.getItem('userId') + '/toggleUnits';

        fetch(url, {
            method: 'PUT',
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then(response => response.json())
            .then(() => {
                if (localStorage.getItem('units') == 'lbs') props.setUnits('kg');
                else props.setUnits('lbs');
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                    <ChangePasswordForm />
                </div>
                <div className="accountItem">
                    <p className="accountLabel">Change Units</p>
                    <UnitToggle handleUnitChange={handleUnitChange} units={props.units}/>
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