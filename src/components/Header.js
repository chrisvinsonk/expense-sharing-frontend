import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Sharing App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/add-user">Add User</Button>
        <Button color="inherit" component={Link} to="/add-expense">Add Expense</Button>
        <Button color="inherit" component={Link} to="/balance-sheet">Balance Sheet</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;