import React, { useState, useEffect } from "react";

const ChangePasswordForm = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);

    const unmatchedPasswordString = 'New passwords must match.';

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        if (event.target.value !== confirmPassword) {
            setMessage(unmatchedPasswordString);
            setSubmitEnabled(false);
        } else {
            setMessage('');
            setSubmitEnabled(true);
        }
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (newPassword !== event.target.value) {
            setMessage(unmatchedPasswordString);
            setSubmitEnabled(false);
        } else {
            setMessage('');
            setSubmitEnabled(true);
        }
    }

    const handlePasswordChange = (event) => {
        const url = 'http://localhost:3001/api/auth/changePassword/' + localStorage.getItem('userId');
        const input = {oldPassword: oldPassword, newPassword: newPassword};

        event.preventDefault();

        if (newPassword === confirmPassword) {
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input)
            })
                .then(response => response.json())
                .then(dataJson => {
                    if (dataJson.error && dataJson.error !== '') setMessage(dataJson.error);
                    else setMessage('Password changed successfully.');
                })
                .catch(error => {
                    setMessage(error);
                });
        }
    }

    return(
        <div className="accountFormContainer changePasswordContainer">
            <div className="accountForm">
                <div className="formItem">
                    <p>Current Password</p>
                    <input type="password" value={oldPassword} onChange={handleOldPasswordChange}></input>
                </div>
                <div className="formItem">
                    <p>New Password</p>
                    <input type="password" value={newPassword} onChange={handleNewPasswordChange}></input>
                </div>
                <div className="formItem">
                    <p>Confirm New Password</p>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                </div>
                {submitEnabled ? <input className="submitBtn" type="submit" value="Submit" onClick={handlePasswordChange}/> 
                               : <input className="submitBtn" type="submit" value="Submit" disabled/>}
            </div>
            <p className="changePasswordMessage">{message}</p>
        </div>
    )
}

export default ChangePasswordForm;