import React, { useState, useEffect } from "react";
import LineChart from '../components/LineChart';
import ModifyLift from './ModifyLift';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Lift(props) {
    const id = props.id;
    const [instances, setInstances] = useState([]);
    const [deletedInstance, setDeletedInstance] = useState({});
    const [modifiedInstance, setModifiedInstance] = useState({});
    const [modifyIsOpen, setModifyIsOpen] = useState(false);
    const BASE_URL = 'http://localhost:3001/api/';

    const handleDelete = (event) => {
        const url = 'http://localhost:3001/api/lifts/delete';
        const input = { name: props.name, username: localStorage.getItem('username') };

        event.preventDefault();

        setModifyIsOpen(true);
    }

    useEffect(() => {
        fetch(BASE_URL + id + '/instances', {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') }
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
    }, [props.newInstance, deletedInstance, modifiedInstance, props.units]);

    return (
        <div className="lift">
            <FontAwesomeIcon icon={faPen} onClick={handleDelete} className="editLift" />
            {modifyIsOpen ? <ModifyLift setRemovedLift={props.setRemovedLift} setModifyIsOpen={setModifyIsOpen} name={props.name}
                id={id} setModifiedLift={props.setModifiedLift} /> : null }
            <div className="liftHeader">
                <h2>{props.name}</h2>
                {instances.length <= 0 ? <p></p> : <p>Most recent e1RM - {Math.round(instances[instances.length - 1].erm)} {props.units}.</p>}
            </div>
            {instances.length <= 0 ? (
                <p className="emptyLift">No data for this lift.</p>
            ) : (
                <LineChart data={instances} name={props.name} setDeletedInstance={setDeletedInstance}
                    setModifiedInstance={setModifiedInstance} units={props.units} />
            )}
        </div>
    );
}

export default Lift;