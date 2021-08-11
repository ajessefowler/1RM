import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';

const chartConfig = {
  type: 'line',
  data: {
    // ...
  },
  options: {
    // ...
  }
};

const Chart = (props) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Get stuff for graph below
  const options = props.options;
  const name = props.name;

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;