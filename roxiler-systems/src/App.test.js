import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

describe('App Component', () => {
    test('renders Transaction Dashboard header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Transaction Dashboard/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders search input', () => {
        render(<App />);
        const searchInput = screen.getByPlaceholderText(/Search transaction/i);
        expect(searchInput).toBeInTheDocument();
    });

    test('renders month select dropdown', () => {
        render(<App />);
        const monthSelect = screen.getByDisplayValue(/March/i); // Assuming default is March
        expect(monthSelect).toBeInTheDocument();
    });

    test('renders TransactionTable component', () => {
        render(<App />);
        const tableElement = screen.getByText(/ID/i); // Assumes table has ID column
        expect(tableElement).toBeInTheDocument();
    });

    test('renders Statistics component', () => {
        render(<App />);
        const statisticsHeader = screen.getByText(/Statistics/i);
        expect(statisticsHeader).toBeInTheDocument();
    });

    test('renders BarChart component', () => {
        render(<App />);
        const barChartHeader = screen.getByText(/Bar Chart Stats/i);
        expect(barChartHeader).toBeInTheDocument();
    });

    test('renders PieChart component', () => {
        render(<App />);
        const pieChartHeader = screen.getByText(/Pie Chart Stats/i);
        expect(pieChartHeader).toBeInTheDocument();
    });
});

