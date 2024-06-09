import React, { useState, useEffect } from 'react';
import { getStatistics } from '../services/api';
import './Statistics.css';

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        const response = await getStatistics(month);
        setStatistics(response.data);
    };

    return (
        <div className="statistics-container">
            <h2>Statistics - {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <div className="statistics">
                <div>Total Sale: {statistics.totalSaleAmount}</div>
                <div>Total Sold Items: {statistics.totalSoldItems}</div>
                <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
            </div>
        </div>
    );
};

export default Statistics;
