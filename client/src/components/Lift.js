import React, { useState, useEffect } from "react";
import LineChart from '../components/LineChart';

function Lift(props) {
    const [instances, setInstances] = useState([]);
    const [deletedInstance, setDeletedInstance] = useState([]);
    const INSTANCES_URL = 'http://localhost:3001/api/lifts/instances';

    const handleDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = {name: props.name, username: localStorage.getItem('username')};

        console.log('lift deleted');
        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            props.setRemovedLift(props.name);
           console.log(props.name + ' deleted');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        const input = {username: localStorage.getItem('username'), name: props.name};
        
        fetch(INSTANCES_URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(dataJson => {
            setInstances(dataJson);
            return dataJson;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [props.newInstance, deletedInstance]);

    return instances.length <= 0 ? (
        <div className="lift">
            <p onClick={handleDelete} className="deleteLift">Delete</p>
            <div className="liftHeader">
                <h2>{props.name}</h2>
            </div>
            <p>No instances for this lift.</p>
        </div>
    ) : (
        <div className="lift">
            <p onClick={handleDelete} className="deleteLift">Delete</p>
            <div className="liftHeader">
                <h2>{props.name}</h2>
            </div>
            <LineChart data={instances} name={props.name} setDeletedInstance={setDeletedInstance}/>
        </div>
    );
}

export default Lift;