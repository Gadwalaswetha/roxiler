import React, { useState, useEffect } from 'react';
import { getPieChartData } from '../services/api';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

const PieChart = ({ month }) => {
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        fetchPieChartData();
    }, [month]);

    const fetchPieChartData = async () => {
        const response = await getPieChartData(month);
        const data = {
            labels: response.data.map(item => item._id),
            datasets: [
                {
                    label: 'Number of Transactions',
                    data: response.data.map(item => item.count),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ]
                }
            ]
        };
        setPieChartData(data);
    };

    return (
        <div className="piechart-container">
            <h2>Pie Chart Stats - {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <Pie data={pieChartData} />
        </div>
    );
};

export default PieChart;
