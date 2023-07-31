import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function ReservationTable({ reservations }) {
  const today = new Date();
  const todayDate = today.toLocaleDateString('lt-LT');
  const filteredReservations = reservations
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((reservation) => reservation.date.split(' ')[0] === todayDate);

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant='h4' align='center'>
        Šiandienos rezervacijos
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table
          sx={{
            minWidth: {
              xs: 300,
              sm: 400,
              md: 500,
              lg: 600,
            },
          }}
          aria-label='reservation table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Laikas</TableCell>
              <TableCell align='center'>Vartotojo vardas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell align='center' component='th' scope='row'>
                  {reservation.date}
                </TableCell>
                <TableCell align='center'>{reservation.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
