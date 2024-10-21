import axios from 'axios';

const API_URL =   process.env.REACT_APP_API_URL || 'https://expense-sharing.vercel.app/';

export const createUser = (userData) => axios.post(`${API_URL}/users`, userData);
export const getUser = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const addExpense = (expenseData) => axios.post(`${API_URL}/expenses`, expenseData);
export const getUserExpenses = (userId) => axios.get(`${API_URL}/expenses/user/${userId}`);
export const getAllExpenses = () => axios.get(`${API_URL}/expenses`);
export const getBalanceSheet = () => axios.get(`${API_URL}/balance-sheet`, { responseType: 'blob' });