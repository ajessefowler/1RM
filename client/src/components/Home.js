import React from "react";
import OneRepMaxForm from '../components/OneRepMaxForm';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Home = () => {
    const { token, setToken } = useToken();

    return token ? <Dashboard /> : (
        <div>
            <OneRepMaxForm />
            <p className="createAccount">Want to track your progress over time?<Link className="inlineLink" to='/register'>Create an account</Link> to save your data.</p>
            <p>Already have an account? 
            <Link className="inlineLink" to='/login'>Login.</Link></p>
        </div>
    )
}

export default Home;