import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTransactions = (month, search, page, perPage) => {
    return axios.get(`${API_URL}/transactions`, {
        params: { month, search, page, perPage }
    });
};

export const getStatistics = (month) => {
    return axios.get(`${API_URL}/statistics`, {
        params: { month }
    });
};

export const getBarChartData = (month) => {
    return axios.get(`${API_URL}/barchart`, {
        params: { month }
    });
};

export const getPieChartData = (month) => {
    return axios.get(`${API_URL}/piechart`, {
        params: { month }
    });
};
