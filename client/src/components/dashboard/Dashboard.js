import React, { useState, useEffect } from 'react';
import './Dashboard.scss';

// Helper Functions
import { organizeApiData, organizePieData } from './DashboardHelpers';

// Services
import ApiClient from '../../services/ApiClient';

// Components
import OptionsContainer from '../options-container/OptionsContainer';
import TabsContainer from '../tabs-container/TabsContainer';
import Spinner from '../spinner/Spinner';

const chartOptions = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
  { value: 'radar', label: 'Radar' },
  { value: 'pie', label: 'Pie' },
  { value: 'doughnut', label: 'Doughnut' },
  { value: 'polar', label: 'Polar' },
];

const defaultChart = {
  value: 'line',
  label: 'Line',
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [technologies, setTechnologies] = useState({});
  const [pieData, setPieData] = useState({});
  const [selectLabel, setSelectLabel] = useState(defaultChart);
  const [maxLabel, setMaxLabel] = useState(0);
  const [techProp, setTechProp] = useState('Technologies');

  useEffect(() => {
    ApiClient.getTechnologies()
      .then((data) => {
        const technologies = organizeApiData(data);
        setTechnologies(technologies);
        setMaxLabel(technologies.Technologies.labels.length);
        let techKeys = Object.keys(technologies);

        const pieDataObj = organizePieData(technologies, techKeys);
        setPieData({ ...pieDataObj });
      })
      .then(() => setIsLoading(false));
  }, []);

  function handleSelectedLabel(e) {
    setSelectLabel(e);
  }

  const handleTabs = (e) => {
    setTechProp(e.target.innerText);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TabsContainer
              technologies={technologies}
              pieData={pieData}
              selectLabel={selectLabel}
              handleTabs={handleTabs}
              techProp={techProp}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
