import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import { getUser } from '../utils/helpers';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const StyledButton = styled(Box)`
  background-color: #3b5998;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 30%;
  margin: 0 auto;
  border: none;
  &:hover {
    background-color: #2d4373;
  }

  @media (max-width: 600px) {
    width: 80%;
    padding: 10px;
  }
`;

const MyReservations = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [bookings, setBookings] = useState([]);
  const [adminInfo, setAdminInfo] = useState();

  useEffect(() => {
    const user = getUser();
    const getBookedDates = async () => {
      const response = await fetch(
        'https://backend.tenisopartneris.lt/v1/bookcourt'
      );
      const data = await response.json();
      const filteredData = data
        .sort((a, b) => b.date - a.date)
        .filter((booking) => booking.userId === user.userID);
      setBookings(filteredData);
    };
    const getAdminInfo = async () => {
      const response = await fetch(
        'https://backend.tenisopartneris.lt/v1/bookcourtadmin'
      );
      const data = await response.json();
      setAdminInfo(data[0]);
    };
    getAdminInfo();
    getBookedDates();
  }, []);

  const handleCancel = async (bookingId) => {
    const response = await fetch(
      `https://backend.tenisopartneris.lt/v1/bookcourt/${bookingId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    if (data) {
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
    }
  };

  const handleDate = (date) => {
    const newDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return newDate.toLocaleDateString('lt-LT', options);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '80px' }} maxWidth='xl'>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{ textAlign: 'center' }}>
          Mano rezervacijos
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '50px',
          }}>
          <Box
            sx={{
              display: 'flex',
              margin: '5px',
              padding: '5px',
              justifyContent: 'space-around',
              borderBottom: '1px solid black',
              display: isMobile ? 'none' : 'flex',
            }}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
              Data
            </Typography>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
              Aikštelė
            </Typography>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
              Įėjimo kodas
            </Typography>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
              Atšaukti
            </Typography>
          </Box>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  margin: '5px',
                  padding: '5px',
                  justifyContent: 'space-around',
                  borderBottom: '1px solid lightgray',
                  flexDirection: isMobile ? 'column' : 'row',
                }}>
                <Typography
                  variant={isMobile ? 'body1' : 'h5'}
                  sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
                  {handleDate(booking.date)}
                </Typography>
                <Typography
                  variant={isMobile ? 'body1' : 'h5'}
                  sx={{
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {booking.courtId} aikštelė
                </Typography>
                <Typography
                  variant={isMobile ? 'body1' : 'h5'}
                  sx={{
                    display: 'flex',
                    flex: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {adminInfo && adminInfo.access_code}
                </Typography>
                <Box
                  sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
                  <StyledButton onClick={() => handleCancel(booking.id)}>
                    ATŠAUKTI
                  </StyledButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              Jūs neturite aktyvių rezervacijų
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default MyReservations;
