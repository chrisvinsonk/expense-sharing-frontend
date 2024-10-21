import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createUser } from '../services/api';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ name, email });
      setMessage(`User created with ID: ${response.data.id}`);
      setName('');
      setEmail('');
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>
      {message && <Typography color="secondary">{message}</Typography>}
    </Container>
  );
};

export default UserForm;