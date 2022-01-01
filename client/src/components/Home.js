import React, { useState } from "react";
import OneRepMaxForm from '../components/OneRepMaxForm';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';

function Home() {
    const { token } = useToken();
    const [units, setUnits] = useState('lbs');
    
    return token ? <Dashboard units={units} setUnits={setUnits}/> : (
        <div>
            <OneRepMaxForm units={units}/>
            <p className="homeText">Create an account or login to save your progress and track your lifts over time.</p>
            <div className="homeButtons">
                <Link className="inlineLink" to='/register'><button>Create Account</button></Link>
                <Link className="inlineLink" to='/login'><button>Login</button></Link>
            </div>
        </div>
    )
}

export default Home;