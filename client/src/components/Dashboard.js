import React, { useState, useEffect } from "react";
import Login from '../components/LoginV2';
import Logout from '../components/Logout';
import Account from '../components/Account';
import OneRepMaxForm from '../components/OneRepMaxForm';
import Lift from '../components/Lift';
import AddLift from '../components/AddButton';
import useToken from '../hooks/useToken';

import authHeader from '../services/authHeader';

const Dashboard = () => {
    const { token, setToken } = useToken();
    const LIFTS_URL = 'http://localhost:3001/api/lifts';
    const [lifts, setLifts] = useState([]);
    const [newInstance, setNewInstance] = useState({});
    const [newLift, setNewLift] = useState({});
    const [removedLift, setRemovedLift] = useState({});
    const [modifiedLift, setModifiedLift] = useState('');
    const [accountIsOpen, setAccountIsOpen] = useState(false);

    const handleOpenAccount = (event) => {
        setAccountIsOpen(true);
    };

    useEffect(() => {
        const input = { username: localStorage.getItem('username') };
        fetch(LIFTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                /* TODO - This is called twice on login but only once if page 
                 *        loaded when already logged in. */
                setLifts(dataJson);
                return dataJson;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [newLift, removedLift, modifiedLift, accountIsOpen]);

    if (!token) return <Login setToken={setToken} />;
    else return (
        <div>
            {accountIsOpen ? <Account setAccountIsOpen={setAccountIsOpen} /> : null }
            {localStorage.getItem('username')
                ? <div className="welcome">
                    <div className="welcomeLeft">
                        <h2>Welcome back, {localStorage.getItem('username')}.</h2>
                        <div className="welcomeButtons">
                            <Logout />
                            <button className="headerBtn" onClick={handleOpenAccount}>My Account</button>
                        </div>
                    </div>
                    <OneRepMaxForm loggedIn="true" lifts={lifts} setNewInstance={setNewInstance} />
                </div>
                : <h2 className="welcome"></h2>}
            <div className="dash">
                {lifts.length < 1 ?
                    <p>Add a lift to start tracking your e1RMs.</p> : lifts.map((item, index) => (
                        <Lift key={index} id={item._id} name={item.name} newInstance={newInstance}
                            setRemovedLift={setRemovedLift} setModifiedLift={setModifiedLift} />
                    ))}
            </div>
            <AddLift setNewLift={setNewLift} />
        </div>
    );
}

export default Dashboard;