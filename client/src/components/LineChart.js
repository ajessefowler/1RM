import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Modify from './Modify';

const liftColors = new Map();

const dotColors = [
    'rgba(54, 162, 235, 0.9)',
    'rgba(195, 42, 42, 0.9)',
    'rgba(28, 161, 41, 0.9)',
    'rgba(219, 120, 44, 0.9)',
    'rgba(51, 51, 51, 0.9)'
];

const lineColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(195, 42, 42, 0.8)',
    'rgba(28, 161, 41, 0.8)',
    'rgba(219, 120, 44, 0.8)',
    'rgba(51, 51, 51, 0.8)'
]

/*
 *  Returns a random integer index within the range of the size of the color arrays.
 */
function getRandomIndex() {
    const max = dotColors.length - 1;
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

/* Check if color is already in map */
function valueIsInMap(val) {
    for (let v of liftColors.values()) {
        if (v == val) {
            return true;
        }
    }
    return false;
}

/*
 *  This function ensures that as many lifts have a unique line color as possible.
 */
function setLiftColor(data) {
    let colorIndex = -1;

    if (localStorage.colorIndices) {
        const colorIndices = new Map(JSON.parse(localStorage.colorIndices));

        if (!colorIndices.has(data[0].lift)) {
            colorIndex = getRandomIndex();

            // If we have unused colors, continue picking new index until we get unused color
            while (liftColors.size < dotColors.length && valueIsInMap(colorIndex)) {
                colorIndex = getRandomIndex();
            }

            liftColors.set(data[0].lift, colorIndex);
            localStorage.colorIndices = JSON.stringify(Array.from(liftColors));
        } else {
            // Get color from localStorage
            colorIndex = colorIndices.get(data[0].lift);
        }
    } else {
        colorIndex = getRandomIndex();
        liftColors.set(data[0].lift, colorIndex);
        localStorage.colorIndices = JSON.stringify(Array.from(liftColors));
    }

    return colorIndex;
}

const LineChart = (props) => {
    const dates = props.data.map(instance => {
        const date = instance.date;
        return date.substring(5, 10) + '-' + date.substring(0, 4);
    });

    // State
    const [modifyIsOpen, setModifyIsOpen] = useState(false);
    const [date, setDate] = useState('');
    const [e1rm, setE1rm] = useState(0);
    const [rep, setRep] = useState('');
    const [weight, setWeight] = useState('');
    const [instanceId, setInstanceId] = useState('');

    // Data arrays
    const erms = props.data.map(instance => Math.round(instance.erm));
    const weights = props.data.map(instance => instance.weight);
    const reps = props.data.map(instance => instance.reps);
    const ids = props.data.map(instance => instance._id);

    // Graph colors
    const colorIndex = setLiftColor(props.data)
    const dotColor = dotColors[colorIndex];
    const lineColor = lineColors[colorIndex];

    const handleClick = (event, elements) => {
        if (elements[0] && event) {
            const index = elements[0].index;

            //setDate(props.data[index].date);
            setDate(event.chart.tooltip.title[0]);
            setE1rm(erms[index]);
            setRep(reps[index]);
            setWeight(weights[index]);
            setInstanceId(ids[index]);
            setModifyIsOpen(true);
        }
    }

    const data = {
        labels: dates,
        datasets: [
            {
                data: erms,
                backgroundColor: dotColor,
                borderColor: lineColor,
                tension: 0.3
            }
        ]
    }

    // TODO - make cursor pointer when hovering over data points
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        onClick: handleClick,
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (i, d) {
                        return 'e1RM: ' + i.dataset.data[i.dataIndex] + ' lbs';
                    },
                    afterBody: function (i, d) {
                        return reps[i[0].dataIndex] + ' reps @ ' + weights[i[0].dataIndex] + ' lbs';
                    }
                },
                displayColors: false,
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        return value + ' lbs';
                    }
                }
            }
        }
    }

    return (
        <div className="chart">
            <Line data={data} options={options} />
            {(modifyIsOpen) ? <Modify setModifyIsOpen={setModifyIsOpen} date={date} e1rm={e1rm}
                reps={rep} weight={weight} id={instanceId} setDeletedInstance={props.setDeletedInstance}
                setModifyIsOpen={setModifyIsOpen} setModifiedInstance={props.setModifiedInstance} /> : ''}
        </div>
    );
};

export default LineChart;