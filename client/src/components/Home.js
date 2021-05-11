import React from "react";
import OneRepMaxForm from '../components/OneRepMaxForm';
import Dashboard from '../components/Dashboard';

const Home = () => {
    return localStorage.getItem('token') ? <Dashboard /> : (
        <div>
            <OneRepMaxForm />
            <p>Want to track your progress over time? Create an account to save your data.</p>
            <p>Already have an account? Login.</p>
        </div>
    )
}

export default Home;