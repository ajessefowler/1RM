import {Line} from 'react-chartjs-2';

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

function getRandomIndex() {
    const max = dotColors.length - 1;
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

const LineChart = (props) => {
    
    const dates = props.data.map(instance => {
        const date = instance.date;
        return date.substring(5,10) + '-' + date.substring(0,4);
    });
    const erms = props.data.map(instance => Math.round(instance.erm));
    const weights = props.data.map(instance => instance.weight);
    console.log(weights);
    const reps = props.data.map(instance => instance.reps);
    const colorIndex = getRandomIndex();
    const dotColor = dotColors[colorIndex];
    const lineColor = lineColors[colorIndex];

    const data = {
        labels: dates,
        datasets: [
            {
                data: erms,
                backgroundColor: dotColor,
                borderColor: lineColor,
            }
        ]
    }

    const options = {
        responsive: true, 
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(i, d) {
                       return 'e1RM: ' + i.dataset.data[i.dataIndex] + ' lbs';
                    },
                    afterBody: function(i, d) {
                        return reps[i[0].dataIndex] + ' reps @ ' + weights[i[0].dataIndex] + ' lbs';
                    }
                },
                displayColors: false,
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, values) {
                        return value + ' lbs';
                    }
                }
            }
        }
    }

    return (
        <div className="chart">
            <Line data={data} options = {options}/>
        </div>
      );
};
  
export default LineChart;