import React, { useState, useEffect } from "react";
import LineChart from '../components/LineChart';
import Delete from '../components/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

function Lift(props) {
    const id = props.id;
    const [instances, setInstances] = useState([]);
    const [deletedInstance, setDeletedInstance] = useState({});
    const [modifiedInstance, setModifiedInstance] = useState({});
    const [confirmisOpen, setConfirmIsOpen] = useState(false);
    const INSTANCES_URL = 'http://localhost:3001/api/lifts/instances';

    const handleDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = { name: props.name, username: localStorage.getItem('username') };

        event.preventDefault();

        setConfirmIsOpen(true);

        /* fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
            .then(response => response.json())
            .then(dataJson => {
                props.setRemovedLift(props.name);
                console.log(props.name + ' deleted');
            })
            .catch(error => {
                console.error('Error:', error);
            }); */
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
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="deleteLift" />
            <FontAwesomeIcon icon={faPen} className="editLift" />
            {confirmisOpen ? <Delete setRemovedLift={props.setRemovedLift} setConfirmIsOpen={setConfirmIsOpen} name={props.name} /> : null}
            <div className="liftHeader">
                <h2>{props.name}</h2>
                {instances.length <= 0 ? <p></p> : <p>Current e1RM - {Math.round(instances[instances.length - 1].erm)} lbs.</p>}
            </div>
            {instances.length <= 0 ? (
                <p>No instances for this lift.</p>
            ) : (
                <LineChart data={instances} name={props.name} setDeletedInstance={setDeletedInstance}
                    setModifiedInstance={setModifiedInstance} />
            )}
        </div>
    );
}

export default Lift;