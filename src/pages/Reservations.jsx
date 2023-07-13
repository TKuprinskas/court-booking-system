import React from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import FirstCourt from '../components/FirstCourt';
import SecondCourt from '../components/SecondCourt';
import Navbar from '../components/Navbar';

const Reservations = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Container sx={{ marginTop: '80px' }}>
      <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center' }}>
        Teniso aikštelių rezervacijos
      </Typography>
      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
        <FirstCourt />
        <SecondCourt />
      </Box>
    </Container>
  );
};

export default Reservations;
