import React, { useState, useEffect } from "react";

const ChangePasswordForm = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const unmatchedPasswordString = 'New passwords must match.';

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        if (event.target.value !== confirmPassword) setMessage(unmatchedPasswordString);
        else setMessage('');
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (newPassword !== event.target.value) setMessage(unmatchedPasswordString);
        else setMessage('');
    }

    const handlePasswordChange = (event) => {
        const url = 'http://localhost:3001/api/auth/changePassword/' + localStorage.getItem('userId');

        if (newPassword === confirmPassword) {
            // Call API
        }
    }

    return(
        <div className="accountFormContainer flexVertical">
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
                <input className="submitBtn" type="submit" value="Submit" onClick={handlePasswordChange}/>
            </div>
            <p className="changePasswordMessage">{message}</p>
        </div>
    )
}

export default ChangePasswordForm;