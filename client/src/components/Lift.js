import React, { useState, useEffect } from "react";
import CanvasJSReact from '../canvasjs.react';
import LiftInstance from '../components/LiftInstance';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Lift(props) {
    const [instances, setInstances] = useState([]);
    const INSTANCES_URL = 'http://localhost:3001/api/lifts/instances';
    const options = {
        title: {
          text: props.name + ' Estimated 1RM'
        },
        data: [{				
                  type: "spline",
                  xValueFormat: "MM-DD-YYYY",
                  dataPoints: []
                      
                    //   { label: "Apple",  y: 10  },
                    //   { label: "Orange", y: 15  },
                    //   { label: "Banana", y: 25  },
                    //   { label: "Mango",  y: 30  },
                    //   { label: "Grape",  y: 28  }
                    //   ]
         }]
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
            dataJson.forEach(function(instance) {
                options.data[0].dataPoints.push({x: new Date(instance.date), y: instance.erm})
            });
            console.log(dataJson);
            return dataJson;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    return instances.length <= 0 ? (
        <div className="lift">
            <p>No instances for this lift.</p>
        </div>
    ) : (
        <div className="lift">
            <p>{props.name}</p>
            <CanvasJSChart options = {options} />
            <div>
            {instances.map((item, index) => (
                <LiftInstance key={index} date={item.date} erm={Math.round(item.erm)} weight={item.weight} reps={item.reps}></LiftInstance>
            ))}
            </div>
        </div>
    );
}

export default Lift;