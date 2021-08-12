import React, { useState, useEffect } from "react";
import Login from '../components/LoginV2';
import Header from '../components/Header';
import OneRepMaxForm from '../components/OneRepMaxForm';
import Lift from '../components/Lift';
import AddLift from '../components/AddButton';
import useToken from '../hooks/useToken';

const Dashboard = () => {
    const { token, setToken } = useToken();
    const LIFTS_URL = 'http://localhost:3001/api/lifts';
    const [lifts, setLifts] = useState([]);
    const [newInstance, setNewInstance] = useState({});
    const [newLift, setNewLift] = useState({});
    const [removedLift, setRemovedLift] = useState({});

    useEffect(() => {
        const input = {username: localStorage.getItem('username')};
        fetch(LIFTS_URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
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
    }, [newLift, removedLift]);

    if (!token) return <Login setToken={setToken}/>;
    else return (
        <div>
            <Header />
            {localStorage.getItem('username') 
                ? <div className="welcome">
                    <h2>Welcome back, {localStorage.getItem('username')}.</h2>
                    <OneRepMaxForm loggedIn="true" lifts={lifts} setNewInstance={setNewInstance}/>
                  </div> 
                : <h2 className="welcome"></h2>}
            <div className="dash">
                {lifts.map((item, index) => (
                    <Lift key={index} id={item._id} name={item.name} newInstance={newInstance} setRemovedLift={setRemovedLift}/>
                ))}
            </div>
            <AddLift setNewLift={setNewLift}/>
        </div>
    );
}

export default Dashboard;