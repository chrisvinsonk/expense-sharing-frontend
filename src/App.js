import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import UserForm from './components/UserForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSheet from './components/BalanceSheet';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<ExpenseList />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/add-expense" element={<ExpenseForm />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;