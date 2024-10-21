import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { getBalanceSheet } from '../services/api';

const BalanceSheet = () => {
  const handleDownload = async () => {
    try {
      const response = await getBalanceSheet();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'balance_sheet.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading balance sheet:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Balance Sheet</Typography>
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Download Balance Sheet
      </Button>
    </Container>
  );
};

export default BalanceSheet;