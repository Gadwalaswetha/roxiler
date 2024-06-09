import React, { useState } from 'react';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './App.css';

const App = () => {
    const [month, setMonth] = useState('03'); // Default to March

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    return (
        <div className="dashboard-container">
            <h1>Transaction Dashboard</h1>
            <div className="controls">
                <input type="text" placeholder="Search transaction" className="search-input" />
                <select value={month} onChange={handleMonthChange} className="month-select">
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                        <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
                    ))}
                </select>
            </div>
            <TransactionTable month={month} />
            <Statistics month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
        </div>
    );
};

export default App;
