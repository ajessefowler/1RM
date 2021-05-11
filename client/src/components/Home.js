import React from "react";
import OneRepMaxForm from '../components/OneRepMaxForm';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';

const Home = () => {
    return localStorage.getItem('token') ? <Dashboard /> : (
        <div>
            <OneRepMaxForm />
            <p>Want to track your progress over time? Create an account to save your data.</p>
            <p>Already have an account?</p>
            <Link to='/login'>Login.</Link>
        </div>
    )
}

export default Home;