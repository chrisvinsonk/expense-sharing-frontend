import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { addExpense } from '../services/api';

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payerId, setPayerId] = useState('');
  const [splitMethod, setSplitMethod] = useState('equal');
  const [splits, setSplits] = useState([{ userId: '', amount: '', percentage: '' }]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        description,
        amount: parseFloat(amount),
        payer_id: parseInt(payerId),
        split_method: splitMethod,
        splits: splits.map(split => ({
          user_id: parseInt(split.userId),
          amount: splitMethod === 'exact' ? parseFloat(split.amount) : undefined,
          percentage: splitMethod === 'percentage' ? parseFloat(split.percentage) : undefined
        }))
      };
      await addExpense(expenseData);
      setMessage('Expense added successfully');
      // Reset form
      setDescription('');
      setAmount('');
      setPayerId('');
      setSplitMethod('equal');
      setSplits([{ userId: '', amount: '', percentage: '' }]);
    } catch (error) {
      setMessage('Error adding expense');
    }
  };

  const handleSplitChange = (index, field, value) => {
    const newSplits = [...splits];
    newSplits[index][field] = value;
    setSplits(newSplits);
  };

  const addSplit = () => {
    setSplits([...splits, { userId: '', amount: '', percentage: '' }]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add Expense</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Payer ID"
          fullWidth
          margin="normal"
          type="number"
          value={payerId}
          onChange={(e) => setPayerId(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Split Method</InputLabel>
          <Select
            value={splitMethod}
            onChange={(e) => setSplitMethod(e.target.value)}
            label="Split Method"
          >
            <MenuItem value="equal">Equal</MenuItem>
            <MenuItem value="exact">Exact</MenuItem>
            <MenuItem value="percentage">Percentage</MenuItem>
          </Select>
        </FormControl>
        {splits.map((split, index) => (
          <div key={index}>
            <TextField
              label={`User ID ${index + 1}`}
              fullWidth
              margin="normal"
              type="number"
              value={split.userId}
              onChange={(e) => handleSplitChange(index, 'userId', e.target.value)}
              required
            />
            {splitMethod === 'exact' && (
              <TextField
                label={`Amount ${index + 1}`}
                fullWidth
                margin="normal"
                type="number"
                value={split.amount}
                onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
                required
              />
            )}
            {splitMethod === 'percentage' && (
              <TextField
                label={`Percentage ${index + 1}`}
                fullWidth
                margin="normal"
                type="number"
                value={split.percentage}
                onChange={(e) => handleSplitChange(index, 'percentage', e.target.value)}
                required
              />
            )}
          </div>
        ))}
        <Button type="button" onClick={addSplit}>Add Split</Button>
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </form>
      {message && <Typography color="secondary">{message}</Typography>}
    </Container>
  );
};

export default ExpenseForm;