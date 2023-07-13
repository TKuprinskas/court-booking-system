import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'lightblue',
        p: 1,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      component='footer'>
      <Typography variant='body2' color='text.secondary' align='center'>
        <Link
          href='/privacy-policy'
          color='inherit'
          underline='hover'
          target='_blank'>
          Privatumo politika
        </Link>
      </Typography>
      <Typography variant='body2' color='text.secondary' align='center'>
        {'© '}
        {new Date().getFullYear()} Teniso Partneris
      </Typography>
    </Box>
  );
}
