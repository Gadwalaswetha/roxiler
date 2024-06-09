import React, { useState, useEffect } from 'react';
import { getBarChartData } from '../services/api';
import { Bar } from 'react-chartjs-2';
import './BarChart.css';

const BarChart = ({ month }) => {
    const [barChartData, setBarChartData] = useState({});

    useEffect(() => {
        fetchBarChartData();
    }, [month]);

    const fetchBarChartData = async () => {
        const response = await getBarChartData(month);
        const data = {
            labels: Object.keys(response.data),
            datasets: [
                {
                    label: 'Number of Transactions',
                    data: Object.values(response.data),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }
            ]
        };
        setBarChartData(data);
    };

    return (
        <div className="barchart-container">
            <h2>Bar Chart Stats - {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <Bar data={barChartData} />
        </div>
    );
};

export default BarChart;
