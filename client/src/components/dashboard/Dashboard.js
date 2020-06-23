import React, { useState, useEffect } from 'react';
import './Dashboard.scss';

// Services
import ApiClient from '../../services/ApiClient';

// Components
import OptionsContainer from '../options-container/OptionsContainer';
import TabsContainer from '../tabs-container/TabsContainer';
import Spinner from '../spinner/Spinner';

import ToggleList from '../toggle/ToggleList';

const chartOptions = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
  { value: 'radar', label: 'Radar' },
  { value: 'pie', label: 'Pie' },
  { value: 'doughnut', label: 'Doughnut' },
  { value: 'polar', label: 'Polar' },
  { value: 'scatter', label: 'Scatter' },
];

const chartJSOptions = {
  responsive: true,
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'hour',
          unitStepSize: 1,
          displayFormats: {
            hour: 'hA',
          },
        },
      },
    ],
  },
};

const defaultChart = {
  value: 'line',
  label: 'Line',
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [technologies, setTechnologies] = useState({});
  const [pieData, setPieData] = useState({});
  const [scatterData, setScatterData] = useState({});
  const [selectLabel, setSelectLabel] = useState(defaultChart);
  const [maxLabel, setMaxLabel] = useState(0);
  const [techProp, setTechProp] = useState('Technologies');
  const [techList, setTechList] = useState([]);

  useEffect(() => {
    ApiClient.getTechnologies()
      .then((technologies) => {
        setTechnologies(technologies);
        setMaxLabel(technologies.Technologies.labels.length);
        // Start of Data Manipulation
        let techKeys = Object.keys(technologies); // Refactor
        let pieDataObj = {};

        for (let i = 0; i < techKeys.length; i++) {
          pieDataObj[techKeys[i]] = {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#EE82EE'],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#EE82EE',
                ],
                label: 'My Data',
              },
            ],
          };
          technologies[techKeys[i]].datasets.forEach((item) => {
            pieDataObj[techKeys[i]].labels.push(item.label);
            pieDataObj[techKeys[i]].datasets[0].data.push(
              item.data.reduce((acc, cur) => {
                return acc + cur;
              })
            );
          });
        }
        setTechList([...pieDataObj['Technologies'].labels]);
        setPieData({ ...pieDataObj });

        let scatterDataObj = {
          datasets: [],
        };

        for (let i = 0; i < technologies.Technologies.datasets.length; i++) {
          // console.log(technologies.Technologies.datasets[i].label);
          scatterDataObj.datasets.push({
            label: technologies.Technologies.datasets[i].label,
            fill: false,
            backgroundColor: '#FF6384',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          });

          technologies.Technologies.labels.forEach((item, index) => {
            // console.log(item.substring(11, 13));
            scatterDataObj.datasets[i].data.push({
              x: parseInt(item.substring(11, 13)),
              y: technologies.Technologies.datasets[i].data[index],
            });
          });
        }

        setScatterData({ ...scatterDataObj });

        console.log('S', scatterDataObj);
        console.log('P', pieDataObj);
        console.log('T', technologies);
      })
      .then(() => setIsLoading(false));
  }, []);

  function handleSelectedLabel(e) {
    setSelectLabel(e);
  }

  const handleTabs = (e) => {
    setTechProp(e.target.innerText);
  };

  const handleToggle = (e) => {
    console.log(e.target.id);
    console.log(scatterData);
  };

  return (
    <>
      <OptionsContainer
        handleSelectedLabel={handleSelectedLabel}
        chartOptions={chartOptions}
        selectLabel={selectLabel}
        maxLabel={maxLabel}
      />

      <div className="chart-container">
        <ToggleList techList={techList} handleToggle={handleToggle} />
        {isLoading ? (
          <Spinner />
        ) : (
          <TabsContainer
            technologies={technologies}
            chartJSOptions={chartJSOptions}
            pieData={pieData}
            scatterData={scatterData}
            selectLabel={selectLabel}
            handleTabs={handleTabs}
            techProp={techProp}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
