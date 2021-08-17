import React, { useState, useEffect } from "react";
import LineChart from '../components/LineChart';
import EditLift from './EditLift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Lift(props) {
    const id = props.id;
    const [instances, setInstances] = useState([]);
    const [deletedInstance, setDeletedInstance] = useState({});
    const [modifiedInstance, setModifiedInstance] = useState({});
    const [modifyIsOpen, setModifyIsOpen] = useState(false);
    const INSTANCES_URL = 'http://localhost:3001/api/lifts/instances';

    const handleDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = { name: props.name, username: localStorage.getItem('username') };

        event.preventDefault();

        setModifyIsOpen(true);
    }

    useEffect(() => {
        const input = { id: id };

        fetch(INSTANCES_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                // Sort the data by date so it appears in chronological order
                dataJson.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });

                setInstances(dataJson);
                return dataJson;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [props.newInstance, deletedInstance, modifiedInstance]);

    return (
        <div className="lift">
            <FontAwesomeIcon icon={faPen} onClick={handleDelete} className="editLift" />
            {modifyIsOpen ? <EditLift setRemovedLift={props.setRemovedLift} setModifyIsOpen={setModifyIsOpen} name={props.name}
                id={id} setModifiedLift={props.setModifiedLift} /> : null }
            <div className="liftHeader">
                <h2>{props.name}</h2>
                {instances.length <= 0 ? <p></p> : <p>Most recent e1RM - {Math.round(instances[instances.length - 1].erm)} lbs.</p>}
            </div>
            {instances.length <= 0 ? (
                <p className="emptyLift">No data for this lift.</p>
            ) : (
                <LineChart data={instances} name={props.name} setDeletedInstance={setDeletedInstance}
                    setModifiedInstance={setModifiedInstance} />
            )}
        </div>
    );
}

export default Lift;