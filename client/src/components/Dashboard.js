import React, { useState, useEffect } from "react";
import Login from '../components/LoginV2';
import Logout from '../components/Logout';
import OneRepMaxForm from '../components/OneRepMaxForm';
import Lift from '../components/Lift';
import useToken from '../hooks/useToken';

const Dashboard = () => {
    const { token, setToken } = useToken();
    const LIFTS_URL = 'http://localhost:3001/api/lifts';
    const [lifts, setLifts] = useState([]);
    //let lifts = [];

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
            console.log(dataJson);
            return dataJson;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <div>
            <OneRepMaxForm />
            <div>
                {lifts.map((item, index) => (
                    <Lift key={index} name={item.name}></Lift>
                ))}
            </div>
            <Logout />
        </div>
    )
}

export default Dashboard;