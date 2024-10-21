import React, { useState, useEffect } from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { getAllExpenses } from '../services/api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getAllExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>All Expenses</Typography>
      <List>
        {expenses.map((expense) => (
          <ListItem key={expense.id}>
            <ListItemText
              primary={expense.description}
              secondary={`Amount: $${expense.amount} | Payer: ${expense.payer} | Date: ${new Date(expense.date).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExpenseList;