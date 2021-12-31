import React, { useState, useEffect } from "react";
import Login from '../components/Login';
import Logout from '../components/Logout';
import Account from '../components/Account';
import OneRepMaxForm from '../components/OneRepMaxForm';
import Lift from '../components/Lift';
import AddButton from '../components/AddButton';
import useToken from '../hooks/useToken';

const Dashboard = (props) => {
    const { token, setToken } = useToken();
    const BASE_URL = 'http://localhost:3001/api/';
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
        console.log(props)
        fetch(BASE_URL + localStorage.getItem('userId') + '/lifts', {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') }
        })
            .then(response => response.json())
            .then(dataJson => {
                /* TODO - This is called twice on login but only once if page 
                 *        loaded when already logged in. */
                setLifts(dataJson.lifts);
                if (props.units !== dataJson.units) props.setUnits(dataJson.units);
                return dataJson;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [newLift, removedLift, modifiedLift, accountIsOpen, props.units]);

    if (!token) return <Login setToken={setToken} />;
    else return (
        <div>
            {accountIsOpen ? <Account setAccountIsOpen={setAccountIsOpen} units={props.units} setUnits={props.setUnits}/> : null }
            {localStorage.getItem('username')
                ? <div className="welcome">
                    <div className="welcomeLeft">
                        <h2>Welcome back, {localStorage.getItem('username')}.</h2>
                        <div className="welcomeButtons">
                            <Logout />
                            <button className="headerBtn" onClick={handleOpenAccount}>My Account</button>
                        </div>
                    </div>
                    <OneRepMaxForm loggedIn="true" lifts={lifts} setNewInstance={setNewInstance} units={props.units}/>
                </div>
                : <h2 className="welcome"></h2>}
            <div className="dash">
                {lifts.length < 1 ?
                    <p>Add a lift to start tracking your e1RMs.</p> : null }
                {lifts.length > 0 ? lifts.map((item, index) => (
                        <Lift key={index} id={item._id} name={item.name} newInstance={newInstance}
                            setRemovedLift={setRemovedLift} setModifiedLift={setModifiedLift} units={props.units}/>
                    )) : null }
            </div>
            <AddButton setNewLift={setNewLift} />
        </div>
    );
}

export default Dashboard;