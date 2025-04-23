import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { Container, Box, useMediaQuery, Typography, Button } from '@mui/material';
import { getUser } from '../utils/helpers';
import kortas2 from '../assets/images/kortas2.jpg';
import styled from 'styled-components';
import ReservationTable from './ReservationsTable';

const PickerContainer = styled(Box)`
  width: 475px;
  margin: 1em auto;
  padding: 1em;
  background-color: #fff;
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
    width: 100%;
  }
`;

const SecondCourt = () => {
  const navigate = useNavigate();
  const user = getUser();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [allBookings, setAllBookings] = useState([]);
  const [adminInfo, setAdminInfo] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && adminInfo) {
      setIsAdmin(user.id === adminInfo.admin_id);
    }
  }, [user, adminInfo]);

  const getBookedDates = async () => {
    const response = await fetch('https://backend.tenisopartneris.lt/v1/bookcourt');
    const data = await response.json();
    const filteredData = data.filter((booking) => booking.courtId === 2);
    setBookedDates(filteredData);
    setAllBookings(data);
  };

  const getAdminInfo = async () => {
    const response = await fetch('https://backend.tenisopartneris.lt/v1/bookcourtadmin');
    const data = await response.json();
    setAdminInfo(data[0]);
  };

  useEffect(() => {
    getAdminInfo();
    getBookedDates();
    setUserId(user.userID);
    setUserName(user.name);
    setUserEmail(user.email);
  }, [user.userID, user.name, user.email]);

  const timeSlotValidator = (slotTime) => {
    // If the user is an admin, only check if the slot is already booked
    if (isAdmin) {
      const checkIfBooked = bookedDates.find((booking) => booking.date === slotTime.toLocaleString('lt-LT'));
      return !checkIfBooked; // Return true if the slot is not booked
    }

    // For regular users, apply all restrictions
    const checkIfBooked = bookedDates.find((booking) => booking.date === slotTime.toLocaleString('lt-LT'));
    const userBookings = allBookings.filter((booking) => {
      const fullBookingDate = new Date(slotTime).getFullYear() + '-' + (new Date(slotTime).getMonth() + 1) + '-' + new Date(slotTime).getDate();
      const bookingDate = booking.bookedDate.toLocaleString('lt-LT').split(',')[0];
      const bookingDateCheck = new Date(bookingDate);
      const fullBookingDateCheck = bookingDateCheck.getFullYear() + '-' + (bookingDateCheck.getMonth() + 1) + '-' + bookingDateCheck.getDate();
      return booking.userId === userId && fullBookingDateCheck === fullBookingDate;
    });
    const twoWeeksInAdvance = new Date();
    twoWeeksInAdvance.setDate(twoWeeksInAdvance.getDate() + 2);
    if (slotTime > twoWeeksInAdvance) {
      return false;
    }
    if (checkIfBooked || userBookings.length >= 2) {
      return false;
    }
    return true;
  };

  const handleScheduled = async (dateTime) => {
    setIsScheduling(true);
    setScheduleErr('');

    const localeDateTime = dateTime.toLocaleString('lt-LT');
    const bookedDate = localeDateTime.split(' ')[0];

    // Check if the court is available at the selected time
    const isAvailable = timeSlotValidator(dateTime);
    if (!isAvailable) {
      setScheduleErr('Rezervacija nesėkminga, kažkas kitas katik užrezervavo šį laiką.');
      setIsScheduling(false);
      return;
    }

    // https://backend.tenisopartneris.lt/v1/bookcourt
    // http://localhost:8000/v1/bookcourt

    const data = await fetch('https://backend.tenisopartneris.lt/v1/bookcourt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        localeDateTime,
        duration: 1,
        courtId: 2,
        userId: userId,
        userName: userName,
        email: userEmail,
        bookedDate: bookedDate,
      }),
    });

    const res = await data.json();
    if (res.message) {
      setScheduleErr(res.message);
      setIsScheduling(false);
      return;
    }
    if (res[0].affectedRows >= 1) {
      setTimeout(() => {
        setScheduleErr('');
        getAdminInfo();
        getBookedDates();
        setIsScheduled(true);
        setIsScheduling(false);
      }, 1000);
    }
  };

  return (
    <Container sx={{ marginTop: isMobile ? '20px' : '50px' }}>
      <Box
        component='img'
        sx={{
          height: 200,
          width: 200,
          borderRadius: '50%',
          display: 'block',
          margin: '0 auto',
        }}
        alt='facebook profile picture'
        src={kortas2}
      />
      <PickerContainer>
        {!isScheduled ? (
          <DayTimePicker
            timeSlotSizeMinutes={60}
            onConfirm={handleScheduled}
            timeSlotValidator={timeSlotValidator}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
            confirmText='Rezervuoti'
            doneText='Rezervacija sėkminga'
            loadingText='Rezervuojama...'
          />
        ) : (
          <Box textAlign='center'>
            <Typography variant='h6' color='success.main' gutterBottom>
              Rezervacija sėkminga!
            </Typography>
            <Box display='flex' justifyContent='center' gap={2} mt={2}>
              <Button variant='contained' color='primary' onClick={() => setIsScheduled(false)}>
                Rezervuoti dar kartą
              </Button>
              <Button variant='outlined' color='secondary' onClick={() => navigate('/mano-rezervacijos')}>
                Eiti į mano rezervacijas
              </Button>
            </Box>
          </Box>
        )}
      </PickerContainer>
      <ReservationTable reservations={bookedDates} />
    </Container>
  );
};

export default SecondCourt;
