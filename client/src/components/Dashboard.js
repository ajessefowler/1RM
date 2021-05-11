import React, { useState, useEffect } from "react";
import Login from '../components/LoginV2';
import Logout from '../components/Logout';
import useToken from '../hooks/useToken';

const Dashboard = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken}/>
    }

    return (
        <div>
            <p>this is dashboard</p>
            <Logout />
        </div>
    )
}

export default Dashboard;